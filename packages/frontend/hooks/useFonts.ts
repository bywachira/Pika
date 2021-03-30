import axios from "axios";
import { useState, useMemo } from "react";
import toast from "react-hot-toast";

const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
});

function useFonts() {
    const [fonts, setFonts] = useState(null);

    function fetchFonts() {
        client.get(`/third-party/fonts`)
            .then(res => {
                setFonts(res.data.fonts)
            }).catch(err => {
                toast.error(err.response?.data?.error);
            })
    }

    useMemo(() => {
        fetchFonts();
    }, [])

    return { fonts };
}

export default useFonts;