import { useEffect, useState } from "react";
import Button from "../buttons/Button";
import FormHeader from "../Form-Header";
import { Language } from "./Vocabulary";
import { fetchWithAuth } from "../../utils/api";

export default function Settings(
    {
        showForm,
        languages,
        toggleSettingsModal,
        onUpdateNativeLanguge
    }:
        {
            showForm: boolean,
            languages: Language[],
            toggleSettingsModal: () => void,
            onUpdateNativeLanguge: (updatedLanguage: Language[]) => void
        }) {

    const [nativeLanguageId, setNativeLanguageId] = useState<string | undefined>(undefined);
    const [backendError, setBackendError] = useState("");

    // const handleChangeLanguageName = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const selectedLanguageId = e.target.id;
    //     const selectedLanguage = updatedLanguages.find(language => language.id === selectedLanguageId);

    //     if (selectedLanguage) {
    //         setUpdatedLanguages(updatedLanguages.map(language =>
    //             language.id === selectedLanguageId ? { ...language, name: e.target.value } : language
    //         ));
    //     }
    //     console.log(111, updatedLanguages);

    // }

    const handleChangeNativeLanguage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNativeLanguageId(e.target.id);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const changeNativeLanguage = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/languages/edit/${nativeLanguageId}`, {
            method: "PUT",
            body: JSON.stringify({ isNative: true }),
        })

        if (changeNativeLanguage.status !== 200) {
            const errorData = await changeNativeLanguage.json();

            setBackendError(errorData.errors[0].message);
        } else {
            const updatedLanguages = languages.map(language =>
                language.id === nativeLanguageId
                    ? { ...language, isNative: true }
                    : { ...language, isNative: false }
            );
            onUpdateNativeLanguge(updatedLanguages);
            setNativeLanguageId(nativeLanguageId);

        }
        toggleSettingsModal();

    }

    if (!showForm) return null;

    useEffect(() => {
        const findInitialNativeLanguage = (languages).filter((language: Language) => language.isNative);

        if (findInitialNativeLanguage) {
            setNativeLanguageId(findInitialNativeLanguage[0]?.id)
        }

    }, [languages])

    return (
        <>
            {showForm && (
                <>
                    <div className="fixed  inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center backdrop-blur-sm z-50">
                        <div className="bg-gray-800 p-6 rounded-md shadow-lg max-w-sm w-full">
                            <FormHeader title="GirAngir" subTitle="Select Native language" />
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-4">
                                    {languages && languages.map((language) => (
                                        <div key={language.id} className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                id={language.id}
                                                name="language"
                                                value={language.name}
                                                checked={nativeLanguageId === language.id}
                                                onChange={handleChangeNativeLanguage}
                                            />
                                            <label htmlFor={language.id} className="ml-2 text-white ">{language.name}</label>
                                        </div>
                                    ))}
                                </div>
                                {backendError && <p className="text-red-500 text-sm">{backendError}</p>}
                                <Button
                                    type="button"
                                    onClick={toggleSettingsModal}
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
        </>
    )
}