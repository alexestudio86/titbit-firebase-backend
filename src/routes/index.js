const {Router} = require('express');
const {db} = require('../firebase')


const router = Router();


router.get('/', async (req,res) => {
    const dayFiltered = new Date();
    dayFiltered.setHours(0,0,0,0);
    try {


        // CATEGORIES

        const categories = [];
        const getCategories = await db.collection('labels').doc('categories').get();
        if( getCategories.empty ){
            console.log('No hay categorias');
        }else{
            categories.push( getCategories.data() );
        }


        // COLLECTIONS

        const collections = [];
        const getCollections = await db.collectionGroup('Desayunos y Almuerzos').get();
        if( getCollections.empty ){
            console.log('No hay collecciones');
        }else{
            getCollections.forEach( (doc) => (
                collections.push( {id: doc.id, ...doc.data()} )
            ));
        }
        //const listLabels = await db.collection('labels').doc('categories').collection('Desayunos y Almuerzos').doc().get();
        //const listLabels = await db.collection('labels/categories/Desayunos y Almuerzos').where('id', '==', 'Almuerzos').get();
        //const listLabels = await db.collectionGroup('Desayunos y Almuerzos').where('id', '!=', 'Almuerzos').get();
        //const listLabels = await db.collectionGroup('Desayunos y Almuerzos').get();


        // PRODUCTS
        const products = [];
        const getProducts = await db.collection("products").get();
        if( getProducts.empty ){
            console.log('No hay productos');
        }else{
            getProducts.docs.map( (doc) => (
                products.push( {id: doc.id, ...doc.data()} )
            ));
        }

        /*
        await onSnapshot(queryOrders, (querySnapshot) => {
            querySnapshot.forEach( (doc) => {
                orderList.push( {id: doc.id} )
            });
        });
        */
        res.render("index", { categories, collections, products });
    }catch(error){
        console.log(error)
    }
});






module.exports = router;