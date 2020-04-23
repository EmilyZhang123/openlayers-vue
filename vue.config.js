module.exports = {
   css:{
      loaderOptions:{
         scss: {
            prependData: `@import "~@/index/index.scss";`
         },
      }
   }
}