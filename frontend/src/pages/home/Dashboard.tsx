import MainContent from "../../components/dashboard/Main-Content";
import Sidebar from "../../components/dashboard/Side-Bar";

export default function Dashboard() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <MainContent />
            </div>
        </>
    )
}

        // const handleTokenRefresh = async () => {
        //     const refreshResponse = await fetch("/refresh-token", {
        //         method: "POST",
        //         credentials: "include",
        //     });

        //     if (refreshResponse.ok) {
        //         const data = await refreshResponse.json();
        //         localStorage.setItem("accessToken", data.accessToken);
        //     } else {
        //         throw new Error("Unable to refresh token");
        //     }
        // };

                    // if (response.status === 401) {
            //     await handleTokenRefresh();

            //     const retryResponse = await tryLogin(email, password);

            //     if (!retryResponse.ok) {
            //         handleBackendError(retryResponse);
            //     } else {
            //         proceedToDashboard(retryResponse);
            //     }

            // }