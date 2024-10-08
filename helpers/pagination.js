module.exports = (objectPagination, countProducts,query )=>{
    if(query.page){
        objectPagination.currentPage = parseInt(query.page);
    }
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem
    objectPagination.totalPage = Math.ceil(countProducts/objectPagination.limitItem)

    return objectPagination
}