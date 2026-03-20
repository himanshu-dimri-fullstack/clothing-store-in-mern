export const getProducts = async ({ slug }) => {
    try {
        console.log("slug:", slug)
        const res = await fetch(`http://localhost:3000/products?catSlug=${slug}`);
        const data = await res.json();
        console.log("data:", data)
        return data;
    }
    catch (err) {
        console.log("message:", err.message)
    }
}

export const getCategory = async ({ slug }) => {
    try {
        console.log("slug:", slug)
        const res = await fetch(`http://localhost:3000/categories?slug=${slug}`);
        const data = await res.json();
        console.log("data:", data)
        return data;
    }
    catch (err) {
        console.log("message:", err.message)
    }
}

