const cipher = {
    encode(offset, msg){
      if (msg == ""){ throw new TypeError;}
      let letter;
      let msgEncode = "";
      for(let i = 0; i < msg.length; i++){
        letter = msg.charCodeAt(i);
        msgEncode += String.fromCharCode(getLetter(letter,offset));
      }
      return msgEncode;
    },
    decode(offset,msg){
      if (msg == ""){ throw new TypeError;}
      offset *= -1;
      let letter;
      let msgDecode = "";
      for(let i = 0; i < msg.length; i++){
        letter = msg.charCodeAt(i);
        msgDecode += String.fromCharCode(getLetter(letter,offset));
      }
      return msgDecode;
    }
  };
  
  //Esta función devuelve el código numérico ASCII de la letra ya cifrada o descifrada: solo mayúsculas
  function getLetter(letter, offset){
    //letter es el código numérico ASCII de la letra y offset es un número para el desplazamiento
    let idLetter = letterValidate(letter);
    let quantityLetter = 26;
    // cifrar o descifrar caracteres especiales
    if(idLetter === 0){ return letter;}
    // cifrar o descifrar números
    if(idLetter === 48){ quantityLetter = 10;}
    //cifrar o descifrar mayúsculas, minúsculas, números
    let position = (letter - idLetter + offset) % quantityLetter;
    if(position < 0){ position = quantityLetter + position;}
    return (position + idLetter);
  }
  
  function letterValidate(letter){
    //Validador de mayúsculas, minúsculas, números o caracteres especiales
    let idLetter = 0; //Number of initial position in ASSCI
    if(letter >=65 && letter<=90){ idLetter = 65;} // Uppercase
    if(letter >=97 && letter<=122){ idLetter = 97;} // Lowercase
    if(letter >=48 && letter<=57){ idLetter = 48;} // Numbers
    return idLetter;
  }
  
  export default cipher;