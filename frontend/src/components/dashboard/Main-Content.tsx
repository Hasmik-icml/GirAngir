import { useEffect, useState } from "react";
import Button from "../buttons/Button";
import FormHeader from "../Form-Header";
import FormField from "../Form-Field";

export default function MainContent() {

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


    const toggleForm = () => {
        setShowForm(!showForm);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const token = localStorage.getItem('accesToken');
        const createNewLanguage = await fetch('http://localhost:3010/languages/create', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": newLanguage
            })
        })

        console.log("createNewLanguage", createNewLanguage.ok);
        if (createNewLanguage.ok) {
            const newLanguageData = await createNewLanguage.json();
            setLanguages((prevLanguages) => [...prevLanguages, newLanguageData.language]);
            setNewLanguage('');
            toggleForm();
        } else {
            console.error('Error creating new language');
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
        const token = localStorage.getItem('accesToken');

        if (token) {
            const fetchData = async () => {
                try {
                    const [vocabularyResponse, languagesResponse] = await Promise.all([
                        fetch('http://localhost:3010/vocabulary/all', {
                            method: "GET",
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json',
                            },
                        }),

                        fetch('http://localhost:3010/languages/all-languages', {
                            method: "GET",
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json',
                            },
                        })
                    ]);

                    const vocabularyData = await vocabularyResponse.json();
                    const languagesData = await languagesResponse.json();

                    setLanguages(languagesData.languages);
                    setVocabulary(vocabularyData);
                } catch (error) {
                    console.error('Error fetching data', error);
                }
            };
            fetchData();
        } else {
            console.log('No token found');
        }
    }, [languages]);

    // const maxRows = Math.max(
    //     ...languages.map((language) => vocabulary?.data[language.name]?.length || 0 : 0)
    // );
    const maxRows = Math.max(
        ...languages.map((language) => language?.name ? vocabulary?.data[language.name]?.length || 0 : 0)
    );

    return (
        <div className="table-container max-w-full overflow-x-auto">
            {/* Tools */}
            <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 border rounded-md">

                <Button type="submit" size="small" onClick={toggleForm}> Add New Language</Button>

                <div className="flex space-x-4">
                    <div className="text-sm">
                        Russian entries: <span className="font-semibold">{10}</span>
                    </div>
                    <div className="text-sm">
                        Armenian entries: <span className="font-semibold">{20}</span>
                    </div>
                    <div className="text-sm">
                        English entries: <span className="font-semibold">{30}</span>
                    </div>
                </div>
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

            {/* Table */}
            <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr>
                        {languages.length > 0 && languages.map((language) => (
                            <td key={language?.id} className="border border-gray-300 px-4 py-2">
                                <input
                                    type="text"
                                    value={languageContent}
                                    onChange={(e) => setLanguageContent(e.target.value)}
                                    className="border border-gray-400 px-2 py-1 w-full"
                                    placeholder={`Enter ${language?.name} content`}
                                />
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: maxRows }).map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            {languages.map((language) => {
                                const content = vocabulary?.data[language?.name]?.[rowIndex]?.content;

                                return (
                                    <td key={language?.id} className="border border-gray-300 px-4 py-2">
                                        <div>
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

            </table>
        </div>
    );
}