const url = "http://localhost:3000/fonts";

export async function getFonts() {

    try {
        const response = await fetch(url);
        return response.json();
    } catch (e) {
        console.error("couldn't get google fonts from server", e);
        return [];
    }
}

/*
    font:
        family: Fontname
        category: serif, ...
        files: {
            regular: ...,
            500: ...,
        }
*/

const fontsLoaded = new Set();
export async function loadFont(font) {

    // don't process existing fonts
    if (fontsLoaded.has(font.family)) return;
    fontsLoaded.add(font.family);

    try {
        const fontFace = new FontFace(font.family, `url(${font.files["regular"]})`);
        const loadedFont = await fontFace.load();
        document.fonts.add(loadedFont);
    } catch (error) {
        console.log(font.family, font, error);
        fontsLoaded.delete(font.family);
    }
}
