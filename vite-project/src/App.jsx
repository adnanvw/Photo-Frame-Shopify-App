import { useState, useEffect, useReducer } from 'react';
import axios from "axios";
import './App.css';

import ParentComponent from "./components/ParentComponent";
import GrootteChild from "./components/childrenComponents/GrootteChild";
import WitruimteChild from "./components/childrenComponents/WitruimteChild";
import BeschermendeChild from "./components/childrenComponents/BeschermendeChild";
import MontageChild from "./components/childrenComponents/MontageChild";
import LijstChild from "./components/childrenComponents/LijstChild";
import OphangsysteemChild from "./components/childrenComponents/OphangsysteemChild";

function App() {

  console.log("Extension Loaded...");

  const background_variants = ["antraciet", "beige", "blauw", "bruin", "donkerblauw", "grijs", "groen", "lichtbeige", "lichtblauw", "lichtgrijs", "lichtgroen", "oranje", "rood", "terracotta"];

  const ACTION = {
    GROOTTE: 'grootte',
    WITRUIMTE: 'witruimte',
    BESCHERMENDE: 'beschermende',
    MONTAGE: 'montage',
    LIJST: 'lijst',
    OPHANGSYSTEEM: 'ophangsysteem'
  };

  const reducer = (state, action) => {

    switch (action.type) {

      case ACTION.GROOTTE:
        return { ...state, "Grootte": action.payload };

      case ACTION.WITRUIMTE:
        return { ...state, "Witruimte": action.payload };

      case ACTION.BESCHERMENDE:
        return { ...state, "Beschermende laag": action.payload };

      case ACTION.MONTAGE:
        return { ...state, "Montage Kunstprint": action.payload };

      case ACTION.LIJST:
        return { ...state, "Lijst": action.payload };

      case ACTION.OPHANGSYSTEEM:
        return { ...state, "Ophangsysteem": action.payload };

      default:
        return state;
    }
  };

  const INITIAL_VALUES = {
    "Grootte": '',
    "Witruimte": '',
    "Beschermende laag": '',
    "Montage Kunstprint": '',
    "Lijst": '',
    "Ophangsysteem": ''
  }

  const [state, dispatch] = useReducer(reducer, INITIAL_VALUES);

  let checkProductExists = document.querySelector(".page-content--product").dataset.product;
  let getProductImage = document.querySelector(".page-content--product").dataset.image;
  getProductImage = 'https://cdn.shopify.com/s/files/1/0624/7563/2848/' + getProductImage;

  const [rules, setRules] = useState([]);
  const [options, setOptions] = useState('');
  const [groote_current_option, setGroote_current_option] = useState('0 x 0 cm');

  const [grootteCopy, setGrootteCopy] = useState('');
  const [grootte, setGrootte] = useState('');

  const [witruimteCopy, setWitruimteCopy] = useState('');
  const [witruimte, setWitruimte] = useState('');

  const [beschermendeCopy, setBeschermendeCopy] = useState('');
  const [beschermende, setBeschermende] = useState('');

  const [montageCopy, setMontageCopy] = useState('');
  const [montage, setMontage] = useState('');

  const [lijstCopy, setLijstCopy] = useState('');
  const [lijst, setLijst] = useState('');

  const [ophangsysteemCopy, setOphangsysteemCopy] = useState('');
  const [ophangsysteem, setOphangsysteem] = useState('');

  const [activeChildComponent, setActiveChildComponent] = useState();
  const [activeImg, setActiveImg] = useState('/images/background_images/antraciet.jpg');

  useEffect(() => {
    fetchOptions();
    appendPreviewContainer();
  }, []);

  useEffect(() => {

    const previewFirst = document.querySelector(".previewFirst");
    const previewSecond = document.querySelector(".previewSecond");

    previewFirst.addEventListener('click', () => previewToggle("first"));
    previewSecond.addEventListener('click', () => previewToggle("second"));

    return () => {
      previewFirst.removeEventListener('click', () => previewToggle("first"));
      previewSecond.removeEventListener('click', () => previewToggle("second"));
    };

  }, [groote_current_option]);

  async function appendPreviewContainer() {
    const imageDiv = document.querySelector(".image-wrap");
    imageDiv.innerHTML =
      `<img id="backgroundImage" style="display: block" src="images/background_images/antraciet.jpg" />
    <div class="parentContainer">
      <div class="divAdjuster">
        <img id="frameImage" class="photoswipe__image lazyautosizes lazyloaded" style="width: 100%!important; height: 100%!important; object-fit:cover; transition: all 0.5s ease 0s !important;" src=${getProductImage} />
      </div>
    </div>
    <div class="select-dropdown">
      <select id="bgSelector">
        <option value="${background_variants[0]}">Antraciet</option>
        <option value="${background_variants[1]}">Aeige</option>
        <option value="${background_variants[2]}">Blauw</option>
        <option value="${background_variants[3]}">Bruin</option>
        <option value="${background_variants[4]}">Donkerblauw</option>
        <option value="${background_variants[5]}">Grijs</option>
        <option value="${background_variants[6]}">Groen</option>
        <option value="${background_variants[7]}">Lichtbeige</option>
        <option value="${background_variants[8]}">Lichtblauw</option>
        <option value="${background_variants[9]}">Lichtgrijs</option>
        <option value="${background_variants[10]}">Lichtgroen</option>
        <option value="${background_variants[11]}">Oranje</option>
        <option value="${background_variants[12]}">Rood</option>
        <option value="${background_variants[13]}">Terracotta</option>
      </select>
    </div>
    <div class="divPreview">
      <div class="previewFirst"><img src=${activeImg} /></div>
      <div class="previewSecond"><img src=${getProductImage} /></div>
    </div>`;

    const previewFirst = document.querySelector(".previewFirst");
    const previewSecond = document.querySelector(".previewSecond");
    document.querySelector(".divPreview").classList.add("preview-first-active");

    previewFirst.addEventListener('click', () => {
      const divAdjuster = document.querySelector(".divAdjuster");

      document.querySelector(".previewSecond").style.border = "unset";
      document.querySelector(".divPreview").classList.remove("preview-second-active");
      document.querySelector(".divPreview").classList.add("preview-first-active");
      document.querySelector("#backgroundImage").style.display = "block";
      document.querySelector(".parentContainer").style.height = "40%";
      document.querySelector(".previewFirst").style.border = "5px solid red";

    });

    previewSecond.addEventListener('click', () => {
      const divAdjuster = document.querySelector(".divAdjuster");

      document.querySelector(".previewFirst").style.border = "unset";
      document.querySelector(".divPreview").classList.remove("preview-first-active");
      document.querySelector(".divPreview").classList.add("preview-second-active");
      document.querySelector("#backgroundImage").style.display = "none";
      document.querySelector(".parentContainer").style.height = "70%";
      document.querySelector(".previewSecond").style.border = "5px solid red";

    });

  };

  let PageMarkup;

  useEffect(() => {

    let currentActiveBg = document.querySelector("#bgSelector");

    if (currentActiveBg) {

      const backgroundImage = document.querySelector("#backgroundImage");

      async function selectFunction() {

        if (currentActiveBg?.value === 'antraciet') {
          backgroundImage.src = "/images/background_images/antraciet.jpg";
        } else if (currentActiveBg?.value === 'beige') {
          backgroundImage.src = "/images/background_images/beige.jpg";
        } else if (currentActiveBg?.value === 'blauw') {
          backgroundImage.src = "/images/background_images/blauw.jpg";
        } else if (currentActiveBg?.value === 'bruin') {
          backgroundImage.src = "/images/background_images/bruin.jpg";
        } else if (currentActiveBg?.value === 'donkerblauw') {
          backgroundImage.src = "/images/background_images/donkerblauw.jpg";
        } else if (currentActiveBg?.value === 'grijs') {
          backgroundImage.src = "/images/background_images/grijs.jpg";
        } else if (currentActiveBg?.value === 'groen') {
          backgroundImage.src = "/images/background_images/groen.jpg";
        } else if (currentActiveBg?.value === 'lichtbeige') {
          backgroundImage.src = "/images/background_images/lichtbeige.jpg";
        } else if (currentActiveBg?.value === 'lichtblauw') {
          backgroundImage.src = "/images/background_images/lichtblauw.jpg";
        } else if (currentActiveBg?.value === 'lichtgrijs') {
          backgroundImage.src = "/images/background_images/lichtgrijs.jpg";
        } else if (currentActiveBg?.value === 'lichtgroen') {
          backgroundImage.src = "/images/background_images/lichtgroen.jpg";
        } else if (currentActiveBg?.value === 'oranje') {
          backgroundImage.src = "/images/background_images/oranje.jpg";
        } else if (currentActiveBg?.value === 'rood') {
          backgroundImage.src = "/images/background_images/rood.jpg";
        } else if (currentActiveBg?.value === 'terracotta') {
          backgroundImage.src = "/images/background_images/terracotta.jpg";
        }

      };

      currentActiveBg.addEventListener('change', selectFunction);
      return () => currentActiveBg.removeEventListener('change', selectFunction);
    }

  }, [background_variants]);

  useEffect(() => {
    const addToCartBtn = document.querySelector(".add-to-cart");

    addToCartBtn.addEventListener('click', cartDetails);

    return () => addToCartBtn.removeEventListener('click', cartDetails);
  }, [state]);

  useEffect(() => {

    for (let i = 0; i < rules.length; i++) {

      if (rules[i].ruleCondition === "hideOptionValue") {

        // console.log("rules[i]", rules[i]);

        let obj = rules[i].ruleOption;
        let obj2 = rules[i].ruleAndOption;

        obj = obj.charAt(0).toUpperCase() + obj.slice(1);
        obj2 = obj2.charAt(0).toUpperCase() + obj2.slice(1);

        if (rules[i].ruleAndOptionValue === "notempty") {

          // console.log("NOT EMPTY");

          if (state[obj] === rules[i].ruleOptionValue && state[obj2] != '') {

            if (rules[i].ruleHiddenConditionOption === 'grootte') {

              let filteredArray = grootte.filter(e => e.optionValue !== rules[i]?.ruleHiddenConditionOptionValue)
              setGrootte(filteredArray);

            } else if (rules[i].ruleHiddenConditionOption === 'witruimte') {

              let filteredArray = witruimte.filter(e => e.optionValue !== rules[i]?.ruleHiddenConditionOptionValue)
              setWitruimte(filteredArray);

            } else if (rules[i].ruleHiddenConditionOption === 'beschermende') {

              let filteredArray = beschermende.filter(e => e.optionValue !== rules[i]?.ruleHiddenConditionOptionValue)
              setBeschermende(filteredArray);

            } else if (rules[i].ruleHiddenConditionOption === 'montage') {

              let filteredArray = montage.filter(e => e.optionValue !== rules[i]?.ruleHiddenConditionOptionValue)
              setMontage(filteredArray);

            } else if (rules[i].ruleHiddenConditionOption === 'lijst') {

              let filteredArray = lijst.filter(e => e.optionValue !== rules[i]?.ruleHiddenConditionOptionValue)
              setLijst(filteredArray);

            } else if (rules[i].ruleHiddenConditionOption === 'ophangsysteem') {

              let filteredArray = ophangsysteem.filter(e => e.optionValue !== rules[i]?.ruleHiddenConditionOptionValue)
              setOphangsysteem(filteredArray);

            }

          } else {
            // setGrootte(grootteCopy);
            // setWitruimte(witruimteCopy);
            // setBeschermende(beschermendeCopy);
            // setMontage(montageCopy);
            // setLijst(lijstCopy);
            // setOphangsysteem(ophangsysteemCopy);
          }


        } else if (rules[i].ruleAndOptionValue === "empty") {

          // console.log("EMPTY");


          if (state[obj] === rules[i].ruleOptionValue && state[obj2] == '') {

            if (rules[i].ruleHiddenConditionOption === 'grootte') {

              let filteredArray = grootte.filter(e => e.optionValue !== rules[i]?.ruleHiddenConditionOptionValue)
              setGrootte(filteredArray);

            } else if (rules[i].ruleHiddenConditionOption === 'witruimte') {

              let filteredArray = witruimte.filter(e => e.optionValue !== rules[i]?.ruleHiddenConditionOptionValue)
              setWitruimte(filteredArray);

            } else if (rules[i].ruleHiddenConditionOption === 'beschermende') {

              let filteredArray = beschermende.filter(e => e.optionValue !== rules[i]?.ruleHiddenConditionOptionValue)
              setBeschermende(filteredArray);

            } else if (rules[i].ruleHiddenConditionOption === 'montage') {

              let filteredArray = montage.filter(e => e.optionValue !== rules[i]?.ruleHiddenConditionOptionValue)
              setMontage(filteredArray);

            } else if (rules[i].ruleHiddenConditionOption === 'lijst') {

              let filteredArray = lijst.filter(e => e.optionValue !== rules[i]?.ruleHiddenConditionOptionValue)
              setLijst(filteredArray);

            } else if (rules[i].ruleHiddenConditionOption === 'ophangsysteem') {

              let filteredArray = ophangsysteem.filter(e => e.optionValue !== rules[i]?.ruleHiddenConditionOptionValue)
              setOphangsysteem(filteredArray);

            }

          } else {
            // setGrootte(grootteCopy);
            // setWitruimte(witruimteCopy);
            // setBeschermende(beschermendeCopy);
            // setMontage(montageCopy);
            // setLijst(lijstCopy);
            // setOphangsysteem(ophangsysteemCopy);
          }


        } else if (rules[i].ruleAndOptionValue === "") {

          // console.log("NONEEEEE");

          if (state[obj] === rules[i].ruleOptionValue) {

            if (rules[i].ruleHiddenConditionOption === 'grootte') {

              let filteredArray = grootte.filter(e => e.optionValue !== rules[i]?.ruleHiddenConditionOptionValue)
              setGrootte(filteredArray);

            } else if (rules[i].ruleHiddenConditionOption === 'witruimte') {

              let filteredArray = witruimte.filter(e => e.optionValue !== rules[i]?.ruleHiddenConditionOptionValue)
              setWitruimte(filteredArray);

            } else if (rules[i].ruleHiddenConditionOption === 'beschermende') {

              let filteredArray = beschermende.filter(e => e.optionValue !== rules[i]?.ruleHiddenConditionOptionValue)
              setBeschermende(filteredArray);

            } else if (rules[i].ruleHiddenConditionOption === 'montage') {

              let filteredArray = montage.filter(e => e.optionValue !== rules[i]?.ruleHiddenConditionOptionValue)
              setMontage(filteredArray);

            } else if (rules[i].ruleHiddenConditionOption === 'lijst') {

              let filteredArray = lijst.filter(e => e.optionValue !== rules[i]?.ruleHiddenConditionOptionValue)
              setLijst(filteredArray);

            } else if (rules[i].ruleHiddenConditionOption === 'ophangsysteem') {

              let filteredArray = ophangsysteem.filter(e => e.optionValue !== rules[i]?.ruleHiddenConditionOptionValue)
              setOphangsysteem(filteredArray);

            }

          } else {
            // setGrootte(grootteCopy);
            // setWitruimte(witruimteCopy);
            // setBeschermende(beschermendeCopy);
            // setMontage(montageCopy);
            // setLijst(lijstCopy);
            // setOphangsysteem(ophangsysteemCopy);
          }
        }
      }
    }
  }, [state]);

  return (
    <div className="product__info-wrapper">
      <div>
        <ParentComponent currentOptionFunction={currentOptionFunction} />
        <br />
        <br />
        {activeChildComponent}
        <br />
        <br />
        <div className="activeContainer">
          <u><i><p id="active-option"></p></i></u>
          <b><p id="active-value"></p></b>
        </div>
        <br />
        <button className="btn btn--full add-to-cart btn--secondary" onClick={cartDetails}>Voeg toe aan winkelwagen</button>
      </div>
    </div>
  )

  async function fetchOptions() {

    const data = await axios.get('https://test-store-2022-22.myshopify.com/apps/myapp/api/options/get');
    let response = data.data.data;

    for (var i = 0, len = response.length; i < len; i++) {

      let arr = response[i].products;

      const findProduct = arr.find((element) => {

        let currentProductID = element.node.id;
        currentProductID = currentProductID.replace("gid://shopify/Product/", "");

        return currentProductID === checkProductExists
      });

      if (findProduct !== undefined) {

        setActiveImg("images/background_images/antraciet.jpg");

        setGroote_current_option(response[i].options[0].Grootte[response[i].options[0].Grootte.length - 1]?.optionValue);
        let splitString = response[i].options[0].Grootte[response[i].options[0].Grootte.length - 1]?.optionValue;

        splitString = splitString.split(" x ");

        let frameHeight = splitString[0];
        let frameWidth = splitString[1];
        frameWidth = frameWidth.split(" cm");
        frameWidth = frameWidth[0];

        const width = Number(frameWidth) / 4.5
        const height = (Number(frameHeight) / 4.5) * 2;
        adjustWidthAndHeight(width, height);

        document.querySelector(".previewFirst").style.border = "5px solid red";

        setRules(response[i].rules);
        setOptions(response);
        setGrootte(response[i].options[0].Grootte);
        setWitruimte(response[i].options[0].Witruimte);
        setBeschermende(response[i].options[0].Beschermende);
        setMontage(response[i].options[0].Montage);
        setLijst(response[i].options[0].Lijst);
        setOphangsysteem(response[i].options[0].Ophangsysteem);

        setGrootteCopy(response[i].options[0].Grootte);
        setWitruimteCopy(response[i].options[0].Witruimte);
        setBeschermendeCopy(response[i].options[0].Beschermende);
        setMontageCopy(response[i].options[0].Montage);
        setLijstCopy(response[i].options[0].Lijst);
        setOphangsysteemCopy(response[i].options[0].Ophangsysteem);
      }
    }
  };

  async function cartDetails() {

    document.querySelector(".add-to-cart").classList.add("btn--loading");

    const product_id = checkProductExists;

    await axios.post("https://test-store-2022-22.myshopify.com/apps/myapp/api/variant/create", {
      "product_id": product_id,
      'product_properties': state,
      "product_rules": rules
    })
      .then(async (response) => {

        const variant_id = response.data.variant_id;

        await axios.post(`https://test-store-2022-22.myshopify.com/cart/add`, {
          'id': variant_id,
          'quantity': 1,
          'properties': state
        })
          .then(response => {

            document.querySelector(".add-to-cart").classList.remove("btn--loading");
            location.reload();

          });




        //     // await axios.post(`https://test-store-2022-22.myshopify.com/cart/clear.js`)
        //     // .then(response => console.log("RESPONSEEEE", response));

      });
  };

  async function currentOptionFunction(activeOption) {

    PageMarkup = activeOption;

    switch (PageMarkup) {
      case 'Grootte':
        setActiveChildComponent(<GrootteChild grootte={grootte} grootteFunction={grootteFunction} />);
        break;
      case 'Witruimte':
        setActiveChildComponent(<WitruimteChild witruimte={witruimte} witruimteFunction={witruimteFunction} />);
        break;
      case 'Beschermende':
        setActiveChildComponent(<BeschermendeChild beschermende={beschermende} beschermendeFunction={beschermendeFunction} />);
        break;
      case 'Montage':
        setActiveChildComponent(<MontageChild montage={montage} montageFunction={montageFunction} />);
        break;
      case 'Lijst':
        setActiveChildComponent(<LijstChild lijst={lijst} lijstFunction={lijstFunction} />);
        break;
      case 'Ophangsysteem':
        setActiveChildComponent(<OphangsysteemChild ophangsysteem={ophangsysteem} ophangsysteemFunction={ophangsysteemFunction} />);
        break;
      default:
        setActiveChildComponent(<GrootteChild grootte={grootte} grootteFunction={grootteFunction} />);
        break;
    }
  };

  async function grootteFunction(index, element) {

    setGroote_current_option(element?.optionValue);

    let splitString = element?.optionValue;
    splitString = splitString.split(" x ");

    let frameHeight = splitString[0];
    let frameWidth = splitString[1];
    frameWidth = frameWidth.split(" cm");
    frameWidth = frameWidth[0];

    const check_which_preview_is_active = document.querySelector(".divPreview");

    if (check_which_preview_is_active.classList.contains("preview-first-active")) {

      const width = Number(frameWidth) / 4.5
      const height = (Number(frameHeight) / 4.5) * 2;

      adjustWidthAndHeight(width, height);

    } else if (check_which_preview_is_active.classList.contains("preview-second-active")) {

      const width = Number(frameWidth) / 3
      const height = (Number(frameHeight) / 4.5) * 2;

      adjustWidthAndHeight(width, height);
    }

    currentActiveValue(ACTION.GROOTTE, element?.optionValue);

    dispatch({ type: ACTION.GROOTTE, payload: element?.optionValue });
  };

  async function witruimteFunction(index, element) {

    const str = element.optionValue;
    const result = str.replace(/[^0-9]/g, "");

    applyPadding(result);
    currentActiveValue(ACTION.WITRUIMTE, element?.optionValue);
    dispatch({ type: ACTION.WITRUIMTE, payload: element?.optionValue });
  };

  async function beschermendeFunction(index, element) {
    currentActiveValue(ACTION.BESCHERMENDE, element?.optionValue);
    dispatch({ type: ACTION.BESCHERMENDE, payload: element?.optionValue });
  };

  async function montageFunction(index, element) {
    currentActiveValue(ACTION.MONTAGE, element?.optionValue);
    dispatch({ type: ACTION.MONTAGE, payload: element?.optionValue });
  };

  async function lijstFunction(index, element) {

    const divAdjuster = document.querySelector(".divAdjuster");
    const frameImage = document.querySelector("#frameImage");

    if (element.optionValue.includes("Zwarte")) {

      divAdjuster.style.border = "10px solid";
      divAdjuster.style.borderImage = "url(images/black.jpg) 200 stretch";

      widthHeightadjust('add');

    } else if (element.optionValue.includes("Geen")) {

      divAdjuster.style.border = "none";
      divAdjuster.style.borderImage = "unset";

      widthHeightadjust('remove');

    } else if (element.optionValue.includes("Witte")) {

      divAdjuster.style.border = "10px solid";
      divAdjuster.style.borderImage = "url(images/white.jpg) 200 stretch";

      widthHeightadjust('add');

    } else if (element.optionValue.includes("Walnoten")) {

      divAdjuster.style.border = "10px solid";
      divAdjuster.style.borderImage = "url(images/walnut.jpg) 200 stretch";

      widthHeightadjust('add');

    }

    currentActiveValue(ACTION.LIJST, element?.optionValue);
    dispatch({ type: ACTION.LIJST, payload: element?.optionValue });
  };

  async function ophangsysteemFunction(index, element) {
    currentActiveValue(ACTION.OPHANGSYSTEEM, element?.optionValue);
    dispatch({ type: ACTION.OPHANGSYSTEEM, payload: element?.optionValue });
  };

  async function applyPadding(value) {

    const imagePadding = document.querySelector("#frameImage");

    if (value != '') {
      imagePadding.classList.add("addedpadding");
      imagePadding.style.padding = `${value}%`;
    } else if (value == '') {
      imagePadding.classList.remove("addedpadding");
      imagePadding.style.padding = "0%";
    }

  };

  async function adjustWidthAndHeight(width, height) {

    const divAdjuster = document.querySelector(".divAdjuster");
    divAdjuster.style.width = `${width}%`;
    divAdjuster.style.height = `${height}%`;
  };

  async function widthHeightadjust(value) {

    const divAdjuster = document.querySelector(".divAdjuster");

    if (value === 'add') {

      if (!divAdjuster.classList.contains("applied")) {

        divAdjuster.classList.add("applied");

        let get_current_height = Number(getComputedStyle(divAdjuster).height.replace('px', '') / getComputedStyle(divAdjuster.parentElement).height.replace('px', '') * 100);

        let get_current_width = Number(getComputedStyle(divAdjuster).width.replace('px', '') / getComputedStyle(divAdjuster.parentElement).width.replace('px', '') * 100);

        divAdjuster.style.width = `${get_current_width + 4}%`;
        divAdjuster.style.height = `${get_current_height + 6}%`;
      }

    } else if (value === 'remove') {

      if (divAdjuster.classList.contains("applied")) {

        divAdjuster.classList.remove("applied");
        let get_current_height = Number(getComputedStyle(divAdjuster).height.replace('px', '') / getComputedStyle(divAdjuster.parentElement).height.replace('px', '') * 100);

        let get_current_width = Number(getComputedStyle(divAdjuster).width.replace('px', '') / getComputedStyle(divAdjuster.parentElement).width.replace('px', '') * 100);

        divAdjuster.style.width = `${get_current_width - 4}%`;
        divAdjuster.style.height = `${get_current_height - 6}%`;

      }
    }
  };

  async function previewToggle(preview) {

    let splitString = groote_current_option;
    splitString = splitString.split(" x ");

    let frameHeight = splitString[0];
    let frameWidth = splitString[1];

    frameWidth = frameWidth.split(" cm");
    frameWidth = frameWidth[0];

    let width;
    let height;

    if (preview === "first") {

      width = Number(frameWidth) / 4.5;
      height = (Number(frameHeight) / 4.5) * 2;

    } else if (preview === "second") {

      width = Number(frameWidth) / 3;
      height = (Number(frameHeight) / 4.5) * 2;

    }

    adjustWidthAndHeight(width, height);

  };

  async function currentActiveValue(option, value) {

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    option = capitalizeFirstLetter(option);

    document.querySelector("#active-option").innerText = `${option}:`;
    document.querySelector("#active-value").innerText = value;
  };

}

export default App;