
// import firebase from "firebase";

// export default class myDatabase{
//   constructor(){
//     this.database = firebase.database();
//   }

//   async selectDB(collectionName){
//     const dbCollection = await this.database.collection(collectionName).get();
//     return dbCollection;
//   }
  
//   async insertDB(collectionName, data){
//       console.log(data);
//       const dbCollection = await this.database.collection(collectionName).add(data);
//       return dbCollection;
//   }
  
//   async updateDB(collectionName, data, ref){
//     const dbCollection = await this.database.collection(collectionName).doc(ref).update(data);
//     return dbCollection;
//   }
  
  
//   async deleteDB(collectionName, ref){
//     const dbCollection = await this.database.collection(collectionName).doc(ref).delete();
//     return dbCollection;
//   }
// }

import firebase from 'firebase';

/**
 * 
 * @param {string} collectionName 
 * @returns 
 */
const _selectAll = async (collectionName) => {
  const database = firebase.firestore();
  const dbCollection = await database.collection(collectionName).get();
  return dbCollection;
}

/**
 * 
 * @param {string} collectionName 
 * @param {string} key 
 * @returns 
 */
 const _selectDoc = async (collectionName, key) => {
  const database = firebase.firestore();
  const dbCollection = await database.collection(collectionName).doc(key).get();
  return dbCollection;
}

/**
 * 
 * @param {string} collectionName 
 * @param {string} queryField 
 * @param {string} searchValue 
 * @returns 
 */
const _selectWhere = async (collectionName, queryField, searchValue) => {
  const database = firebase.firestore();
  const dbCollection = await database.collection(collectionName).where(queryField, "==", searchValue).get();
  return dbCollection;
}

/**
 * 
 * @param {string} collectionName 
 * @param {object} data Data to insert 
 * @returns 
 */
const _insert = async (collectionName, data) => {
    const database = firebase.firestore();
    const dbCollection = await database.collection(collectionName).add(data);
    return dbCollection;
}

/**
 * 
 * @param {string} collectionName 
 * @param {string} key 
 * @param {string} data 
 * @returns 
 */
const _insertDoc = async (collectionName, key, data) => {
  const database = firebase.firestore();
  const dbCollection = await database.collection(collectionName).doc(key).add(data);
  return dbCollection;
}

const _insertDocCollection = async (collectionName, key, data) => {
  const database = firebase.firestore();
  const dbCollection = await database.collection(collectionName).doc(key).collection("2").add(data);
  return dbCollection;
}

/**
 * 
 * @param {string} collectionName 
 * @param {object} data data to update
 * @param {*} key Reference for the update
 * @returns 
 */
const _update = async (collectionName, data, key) => {
  const database = firebase.firestore();
  const dbCollection = await database.collection(collectionName).doc(key).update(data);
  return dbCollection;
}

/**
 * 
 * @param {string} collectionName 
 * @param {any} ref Reference for the delete
 * @returns 
 */
const _delete = async (collectionName, ref) => {
  const database = firebase.firestore();
  const dbCollection = await database.collection(collectionName).doc(ref).delete();
  return dbCollection;
}


export { _insert, _insertDoc, _update, _delete, _selectDoc, _selectWhere, _selectAll, _insertDocCollection };

