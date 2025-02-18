const fromLanguage=document.querySelector("#from-language");
const toLanguage=document.querySelector("#to-language");
const translateBtn = document.querySelector("#translate-btn");
const textInput = document.querySelector("#text");
const translatedText = document.querySelector("#translated-text");

document.addEventListener("DOMContentLoaded", async function (){
    const url = 'https://microsoft-translator-text-api3.p.rapidapi.com/languages';
const options = {
        method: 'GET',
        headers: {
                'x-rapidapi-key': '177c0449d1msh21d0f8b562df9e2p16da0ajsn1c71b5b75fd7',
                'x-rapidapi-host': 'microsoft-translator-text-api3.p.rapidapi.com'
        }
};

try {
        const response = await fetch(url, options);
        const data = await response.json();

    const languages = data.translation;
    Displaylanguages(languages, fromLanguage);
    Displaylanguages(languages, toLanguage);
} catch (error) {
        console.error(error);
}


})
function Displaylanguages (languages, dropdownOptions){

    dropdownOptions.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select a language";
    dropdownOptions.appendChild(defaultOption);

    for (const language in languages) {

        const option = document.createElement("option");
        option.value = language;
        option.textContent = languages[language].name;
        dropdownOptions.appendChild(option);

    }

}
translateBtn.addEventListener("click", async function (){

    const fromlang=fromLanguage.value;
    const tolang=toLanguage.value;
    const textToTranslate=textInput.value.trim();

    if (!fromlang || !tolang || !textToTranslate) {
        alert ("please select languges to tansalate first")
        return
    }

    const TranslateUrl = `https://microsoft-translator-text-api3.p.rapidapi.com/translate?to=${tolang}&from=${fromlang}&textType=plain`;

    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '177c0449d1msh21d0f8b562df9e2p16da0ajsn1c71b5b75fd7',
            'x-rapidapi-host': 'microsoft-translator-text-api3.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([
            {
                Text: textToTranslate
            }
        ])
    };

    try {
        const response = await fetch(TranslateUrl,options);
        const result = await response.json();
        console.log(result);

        translatedText.textContent=result[0].translations[0].text;

    } catch (error) {
        console.error("error occured when translating",error);
        translatedText.textContent = "Error fetching translation.";
    }
})