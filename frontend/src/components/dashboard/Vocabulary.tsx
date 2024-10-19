import { useEffect, useState } from "react";
import Button from "../buttons/Button";
import FormHeader from "../Form-Header";
import FormField from "../Form-Field";
import { fetchWithAuth } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import SettingsModal from "./SettingsModal";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export interface ILanguage {
    id: string;
    name: string;
    userId: string;
    isNative: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export interface IVocabularyItem {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    languageId: string;
    userId: string;
}

export interface IVocabulary {
    data: { [key: string]: IVocabularyItem[] };
    count: number;
}

export default function Vocabulary() {
    const [languageContent, setLanguageContent] = useState<{ [key: string]: string }>({});
    const [languages, setLanguages] = useState<ILanguage[]>([]);
    const [vocabulary, setVocabulary] = useState<IVocabulary | null>(null);
    const [showAddLanguageForm, setAddLanguageForm] = useState(false);
    const [showSettingsForm, setShowSettingsForm] = useState(false);
    const [newLanguage, setNewLanguage] = useState('');
    const [activeTab, setActiveTab] = useState('');
    const [doRefresh, setDoRefresh] = useState(false);
    const [isNative, setIsNative] = useState(false);
    const [backendError, setBackendError] = useState("");
    const [manageTranslations, setManageTranslations] = useState(false);
    const [showTranslation, setShowTranslation] = useState<string[]>([]);
    const [highlightedItem, setHighlightedItem] = useState(false);

    const alertMessage = (message: string) => {
        toast.warning(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const history = useNavigate();

    const handelRefresh = () => {
        setDoRefresh(!doRefresh);
    };

    const toggleAddLanguageModal = () => {
        setAddLanguageForm(!showAddLanguageForm);
    };

    const toggleSettingsModal = () => {
        setShowSettingsForm(!showSettingsForm);
    };

    const toggleIsNative = () => {
        setIsNative(!isNative);
        setBackendError('');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const createNewLanguage = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/languages/create`, {
            method: "POST",
            body: JSON.stringify({
                "name": newLanguage,
                "isNative": isNative,
            })
        })

        if (createNewLanguage.status === 400) {
            const errorData = await createNewLanguage.json();

            setBackendError(errorData.errors[0].message);
        } else {

            const newLanguageData = await createNewLanguage.json();

            setLanguages((prevLanguages) => [...prevLanguages, newLanguageData.language]);
            setNewLanguage('');
            setDoRefresh(true);
            toggleAddLanguageModal();
            setIsNative(false);
        }
    }

    const handleNewLanguageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewLanguage(e.target.value);
    };

    const updateNativeLanguage = (updatedLanguage: ILanguage[]) => {
        if (updatedLanguage.length > 0) {
            setLanguages(updatedLanguage);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, languageId: string) => {
        setLanguageContent({
            ...languageContent,
            [languageId]: e.target.value,
        });
        setBackendError('');
    };

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>, languageId: string,) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            const response = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/vocabulary/create`, {
                method: "POST",
                body: JSON.stringify({
                    "content": languageContent[languageId],
                    "languageId": languageId
                }),
            });

            if (response.ok) {
                const newContent = await response.json();
                console.log("222", newContent);

                setLanguageContent({
                    ...languageContent,
                    [languageId]: '',
                });
                setDoRefresh(true);
            } else {
                const errorData = await response.json();
                setBackendError(errorData.errors[0].message);
            }
        }
    };

    const handleShowRealationsOfContents = async (e: React.MouseEvent<HTMLTableCellElement, MouseEvent>, nativeContentId?: string) => {
        e.preventDefault();
        const data = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/vocabulary/${nativeContentId}`, {
            method: "GET",
        });
        const ranslationData = await data.json();

        const allIds = [ ...new Set(
            ranslationData.data.flatMap((item: { contentFromId: string; contentToId: string; }) => [item.contentFromId, item.contentToId])
        )] as string[];

        console.log(allIds);
        setShowTranslation(allIds);

    };

    const handleManageTranslation = () => {
        setManageTranslations(!manageTranslations);
    };

    useEffect(() => {
        // Fetch request for data
        const fetchData = async () => {
            try {
                const [vocabularyResponse, languagesResponse] = await Promise.all([
                    fetchWithAuth(`${import.meta.env.VITE_API_URL}/vocabulary/all`, {
                        method: "GET",
                    }),

                    fetchWithAuth(`${import.meta.env.VITE_API_URL}/languages/all-languages`, {
                        method: "GET"
                    })
                ]);

                if (!vocabularyResponse.ok || !languagesResponse.ok) {
                    history("/login");

                } else {

                    const vocabularyData = await vocabularyResponse.json();
                    const languagesData = await languagesResponse.json();

                    setLanguages(languagesData.languages);
                    setVocabulary(vocabularyData);

                    if (!activeTab && languagesData.languages.length > 0) {
                        setActiveTab(languagesData.languages[0]?.id);
                    }
                }
            } catch (error) {
                console.error('Error fetching data', error);
                history("/login");
            }
        };
        fetchData();
        setDoRefresh(false);

    }, [doRefresh]);

    const maxRows = Math.max(
        ...languages.map((language) => language?.name ? vocabulary?.data[language.name]?.length || 0 : 0)
    );

    return (
        <div className="table-container max-w-full overflow-x-auto">
            {/* Tools */}
            <div className={`${manageTranslations ? 'opacity-50' : 'opacity-100'} flex justify-between items-center mb-4 p-4 bg-gray-100 border rounded-md`}>
                <Button type="submit" size="small" color='gray' onClick={manageTranslations ? () => alertMessage("Please complete the editing!") : toggleAddLanguageModal}> &#10010; </Button>
                <Button type="submit" size="small" color='gray' onClick={manageTranslations ? () => alertMessage("Please complete the editing!") : toggleSettingsModal}> Settings </Button>
                {showSettingsForm && (
                    <SettingsModal
                        showForm={showSettingsForm}
                        languages={languages}
                        toggleSettingsModal={toggleSettingsModal}
                        onUpdateNativeLanguge={updateNativeLanguage}
                        doRefresh={handelRefresh}
                    />
                )}
                <Button type="submit" size="fixed-medium" color={manageTranslations ? "red" : "gray"} onClick={handleManageTranslation}> {manageTranslations ? "Save" : "Manage Translations"} </Button>
            </div>
            <ToastContainer />

            <div className="relative flex justify-between items-center mb-4 p-4 bg-gray-100 border rounded-md">
                {backendError && (
                    <div className="absolute top-0 left-0 w-full bg-red-500 text-white p-2 rounded-md">
                        {backendError}
                    </div>
                )}
            </div>
            {/* Modal */}
            {showAddLanguageForm && (
                <>
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center backdrop-blur-sm z-50">
                        <div className="bg-gray-800 p-6 rounded-md shadow-lg max-w-sm w-full">
                            <FormHeader title="GirAngir" subTitle="Add new language" />
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <FormField
                                    id="new-language"
                                    name="new-language"
                                    type="input"
                                    autoComplete="email"
                                    required
                                    placeholder="Enter new language" children={undefined}
                                    value={newLanguage}
                                    onChange={handleNewLanguageChange}
                                />
                                <div>

                                    <input type="checkbox" id="is-native" checked={isNative} onChange={toggleIsNative} className="mr-2" />
                                    <label htmlFor="is-native" className="text-gray-400">Make native language</label>
                                </div>
                                {backendError && <p className="text-red-500 text-sm">{backendError}</p>}
                                <Button
                                    type="button"
                                    onClick={toggleAddLanguageModal}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </div>
                </>

            )
            }
            {/* For small devices */}
            {/* Tabs for languages */}
            <div className="block sm:hidden overflow-x-auto">
                <ul className="flex justify-around border-b whitespace-nowrap">
                    {languages.map((language) => (
                        <li key={language?.id}
                            className={`flex-1 p-2 ${activeTab === language?.id ? 'bg-slate-600 text-white' : 'text-gray-900 bg-gray-200'} rounded-t-lg border-l border-gray-300 ml-[3px]`}
                            onClick={() => setActiveTab(language.id)
                            }>
                            <button className="focus:outline-none">
                                {language?.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Tab content (one language column at a time) */}
            <div className="sm:hidden">
                {languages && languages.map((language) => (
                    activeTab === language?.id && (
                        <div key={language?.id} className="p-4 border rounded-md">
                            <div className="flex justify-between items-center text-sm text-white px-2 py-2 bg-gray-300 cursor-pointer">
                                <span className="font-semibold text-slate-700">{language?.name}:  {vocabulary && vocabulary?.data[language?.name]?.length}</span>
                            </div>
                            <input
                                type="text"
                                value={languageContent[language?.id] || ''}
                                onChange={(e) => handleInputChange(e, language?.id)}
                                onKeyDown={(e) => handleKeyDown(e, language?.id)}
                                className="border border-gray-400 px-2 py-1 w-full focus:outline-none"
                                placeholder={`Enter ${language?.name} content`}
                            />
                            <div className="border border-gray-300 p-2">
                                {/* Table content for the selected language */}
                                <table className="table-auto border-collapse border border-gray-300 w-full table-fixed">
                                    <tbody>
                                        {vocabulary && vocabulary?.data[language?.name]?.map((language, index) => (
                                            <tr key={index} className="border border-gray-300 w-full">
                                                <td className="border border-gray-300 px-4 py-2 w-full">
                                                    <div className="flex items-center">
                                                        {language?.content ? (
                                                            <>
                                                                {manageTranslations ?
                                                                    <>
                                                                        <input type="checkbox" className="mr-2" />
                                                                        <span className="text-gray-400">{language?.content}</span>
                                                                    </> :
                                                                    <span className="text-gray-500">{language?.content}</span>
                                                                }
                                                            </>
                                                        ) : ''
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                ))}
            </div>
            {/* Table */}
            <div className="hidden sm:block table-container max-w-full overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <div className="overflow-auto max-h-screen">
                        <thead>
                            <tr>
                                {languages.length > 0 && languages.map((language) => (
                                    <>
                                        <td key={language?.id} className="border border-gray-300 px-2 py-1 hover:bg-gray-200 cursor-pointer min-w-[150px] sm:min-w-[100px] lg:min-w-[200px]">
                                            <div className="flex justify-between text-sm text-white px-2 py-2 bg-gray-300">
                                                <span className="font-semibold text-slate-700">{language?.name}:  {vocabulary && vocabulary?.data[language?.name]?.length}</span>
                                            </div>
                                            <input
                                                type="text"
                                                value={languageContent[language?.id] || ''}
                                                onChange={(e) => handleInputChange(e, language?.id)}
                                                onKeyDown={(e) => handleKeyDown(e, language?.id)}
                                                className="border border-gray-400 px-2 py-1 w-full focus:outline-none"
                                                placeholder={`Enter ${language?.name} content`}
                                            />
                                        </td>
                                    </>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: maxRows }).map((_, rowIndex) => (
                                <tr key={rowIndex}>
                                    {languages.map((language, colIndex) => {
                                        const content = vocabulary?.data[language?.name]?.[rowIndex]?.content;
                                        const nativeContentId = vocabulary?.data[language?.name]?.[rowIndex];
                                        return (
                                            <td key={language?.id}
                                                className={colIndex === 0 ?
                                                    "border border-gray-300 px-4 py-2 cursor-pointer hover:bg-gray-300 min-w-[150px] sm:min-w-[100px] lg:min-w-[200px]" :
                                                    "border border-gray-300 px-4 py-2 min-w-[150px] sm:min-w-[100px] lg:min-w-[200px]"}
                                                onClick={(colIndex === 0 && manageTranslations) ? (e) => handleShowRealationsOfContents(e, nativeContentId?.id) : undefined}
                                            >
                                                <div className="flex items-center">
                                                    {content ? (

                                                        <>
                                                            {manageTranslations ?
                                                                <>
                                                                    <input type="checkbox" className="mr-2" checked={showTranslation ? showTranslation.includes(nativeContentId?.id || '') : false} />
                                                                    <span className="text-gray-400">{content}</span>
                                                                </> :
                                                                <span className="text-gray-500">{content}</span>
                                                            }
                                                        </>
                                                    ) : ''
                                                    }
                                                </div>
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </div>
                </table>
            </div>
        </div >
    );
}