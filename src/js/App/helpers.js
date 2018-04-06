const cloudinaryPath = 'http://res.cloudinary.com/dgp4ou2ev';

export function cloudinaryAsset(name, transforms = []) {
    return `${cloudinaryPath}/image/upload/${transforms.join(',')}/${name}`;
}

export function cloudinaryVideoAsset(name, transforms = []) {
    return `${cloudinaryPath}/video/upload/${transforms.join(',')}/${name}`;
}


export default {
    cloudinaryAsset,
    cloudinaryVideoAsset,
};
