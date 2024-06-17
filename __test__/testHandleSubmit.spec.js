import { isValidHttpUrl } from "../src/client/js/handleSubmit"

test("Testing the isValidHttpUrl() function with an invalid url", () => {
    const blog_url = "blogURL";
    const output = false;
    expect(isValidHttpUrl(blog_url)).toEqual(output);
})


test("Testing the isValidHttpUrl() function with a valid url", () => {
    const blog_url = "https://spring.developpez.com/";
    const output = true;
    expect(isValidHttpUrl(blog_url)).toEqual(output);
})
