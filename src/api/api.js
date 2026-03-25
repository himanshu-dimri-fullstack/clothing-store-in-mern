export const getCategory = async ({ slug }) => {
    try {
        const res = await fetch(`http://localhost:3000/categories?slug=${slug}`);
        const data = await res.json();
        console.log("data:", data)
        return data;
    }
    catch (err) {
        console.log("message:", err.message);
    }
}

export const getProducts = async ({ slug, subCatSlug, page, limit }) => {
    try {

        let url = `http://localhost:3000/products?catSlug=${slug}&_page=${page}&_per_page=${limit}`;

        if (subCatSlug) {
            url += `&subCatSlug=${subCatSlug}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        return data;

    } catch (err) {
        console.log("message:", err.message);
    }
};

export const getProduct = async ({ slug }) => {
    try {
        const res = await fetch(`http://localhost:3000/products?slug=${slug}`);
        const data = await res.json();
        console.log("data:", data)
        return data;
    }
    catch (err) {
        console.log("message:", err.message)
    }
}

export const getSubCategories = async ({ slug }) => {
    try {
        const res = await fetch(`http://localhost:3000/subCategories?catSlug=${slug}`);
        const data = await res.json();
        console.log("data:", data)
        return data;
    }
    catch (err) {
        console.log("message:", err.message)
    }
}

export const getCategories = async () => {
    try {
        const res = await fetch("http://localhost:3000/categories");
        const data = await res.json();
        console.log("data:", data)
        return data;
    }
    catch (err) {
        console.log("message:", err.message)
    }
}