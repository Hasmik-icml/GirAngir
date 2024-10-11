import { useEffect, useState } from "react";
import Button from "../buttons/Button";
import FormHeader from "../Form-Header";
import FormField from "../Form-Field";
import { fetchWithAuth } from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function Vocabulary() {

    interface Language {
        id: string;
        name: string;
        userId: string;
        isNative: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
    }

    interface VocabularyItem {
        id: string;
        content: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
        languageId: string;
        userId: string;
    }

    interface Vocabulary {
        data: { [key: string]: VocabularyItem[] };
        count: number;
    }

    const [languageContent, setLanguageContent] = useState('');
    // const [armenianContent, setArmenianContent] = useState('');
    // const [russianContent, setRussianContent] = useState('');
    const [languages, setLanguages] = useState<Language[]>([]);
    const [vocabulary, setVocabulary] = useState<Vocabulary | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [newLanguage, setNewLanguage] = useState('');
    const [activeTab, setActiveTab] = useState('');
    const [isLanguageAdded, setIsLanguageAdded] = useState(false);


    const history = useNavigate();

    const toggleForm = () => {
        setShowForm(!showForm);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const createNewLanguage = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/languages/create`, {
            method: "POST",
            body: JSON.stringify({
                "name": newLanguage
            })
        })

        if (!createNewLanguage.ok) {
            history("/login");
        } else {

            const newLanguageData = await createNewLanguage.json();
            setLanguages((prevLanguages) => [...prevLanguages, newLanguageData.language]);
            setNewLanguage('');
            setIsLanguageAdded(true);
            toggleForm();
        }


    }

    const handleNewLanguageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewLanguage(e.target.value);
    }
    // const handleKeyPress = (e: React.KeyboardEvent, column: string) => {
    //     if (e.key === 'Enter') {
    //         if (column === 'english') {
    //             setData({ ...data, english: [...data.english, englishWord] });
    //             setEnglishWord('');
    //         } else if (column === 'armenian') {
    //             setData({ ...data, armenian: [...data.armenian, armenianWord] });
    //             setArmenianWord('');
    //         } else if (column === 'russian') {
    //             setData({ ...data, russian: [...data.russian, russianWord] });
    //             setRussianWord('');
    //         }
    //     }
    // };

    useEffect(() => {
        // Fetch request for data
        const fetchData = async () => {
            try {
                const [vocabularyResponse, languagesResponse] = await Promise.all([
                    fetchWithAuth(`${import.meta.env.VITE_API_URL}/vocabulary/all`, {
                        method: "GET",
                    }),

                    fetchWithAuth(`${import.meta.env.VITE_API_URL}/languages/all-languages`, {
                        method: "GET",
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
        setIsLanguageAdded(false);

    }, [isLanguageAdded]);

    const maxRows = Math.max(
        ...languages.map((language) => language?.name ? vocabulary?.data[language.name]?.length || 0 : 0)
    );

    return (
        <div className="table-container max-w-full overflow-x-auto">
            {/* Tools */}
            <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 border rounded-md">
                <Button type="submit" size="small" color='gray' onClick={toggleForm}> Add New Language</Button>
            </div>
            {/* Modal */}
            {showForm && (
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
                                <Button
                                    type="button"
                                    onClick={toggleForm}
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

            )}
            {/* Tabs for languages */}
            <div className="block sm:hidden">
                <ul className="flex justify-around border-b">
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
                            <div className="text-sm text-white px-4 py-2 bg-gray-300">
                                {language?.name}: <span className="font-semibold">{vocabulary && vocabulary?.data[language?.name]?.length}</span>
                            </div>
                            {/* Replace this with your actual table rows */}
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
                                                                <input type="checkbox" className="mr-2" />
                                                                {language?.content}
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
                                        <td key={language?.id} className="border border-gray-300 px-2 py-1 min-w-[150px] sm:min-w-[100px] lg:min-w-[200px]">
                                            <div className="text-sm text-white px-4 py-2 bg-gray-300">
                                                {language?.name}: <span className="font-semibold">{vocabulary && vocabulary?.data[language?.name]?.length}</span>
                                            </div>
                                            <input
                                                type="text"
                                                value={languageContent}
                                                onChange={(e) => setLanguageContent(e.target.value)}
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
                                    {languages.map((language) => {
                                        const content = vocabulary?.data[language?.name]?.[rowIndex]?.content;

                                        return (
                                            <td key={language?.id} className="border border-gray-300 px-4 py-2 min-w-[150px] sm:min-w-[100px] lg:min-w-[200px]">
                                                <div className="flex items-center">
                                                    {content ? (
                                                        <>
                                                            <input type="checkbox" className="mr-2" />
                                                            {content}
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
        </div>
    );
}