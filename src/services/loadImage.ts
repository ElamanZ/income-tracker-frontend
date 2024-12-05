import { useMutation } from '@tanstack/react-query';
import { baseAxios } from '../utils/baseAxios';

export type LoadImageArg = {
    image: File;
};

type LoadImageResponse = {
    id: string;
    url: string;
};


export const loadImage = async (arg: LoadImageArg) => {

    const formData = new FormData();
    formData.append("image", arg.image);

    const { data } = await baseAxios.post<LoadImageResponse>('/images', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return data;
}

export const useLoadImage = () => {
    const mutation = useMutation({
        mutationFn: loadImage,
    });

    return [mutation.mutateAsync, mutation] as const

}