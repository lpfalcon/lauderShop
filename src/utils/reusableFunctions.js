/**
 *
 * @param {*} title
 * @param {*} tam
 * @returns VALIDATE THE SIZE OF A STRING
 */
const getTitle =(title, tam) =>{
  return title && title.length > tam ? `${title.slice(0, tam)} ...` : title
}
export default  getTitle
