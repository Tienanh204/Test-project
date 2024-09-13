//Xử lý bên frontend

//1. Lọc sản phẩm theo trạng thái (tất cả/ hoạt động/ dừng hoạt động)
const buttonStatus = document.querySelectorAll("[button-status]")
if(buttonStatus.length > 0){
    let url = new URL(window.location.href)
    buttonStatus.forEach((button)=>{
        button.addEventListener("click", ()=>{
            const status = button.getAttribute("button-status")
            if(status){
                url.searchParams.set("status", status)
            }else{
                url.searchParams.delete("status")
            }
            window.location.href=url.href
        })
    })
}


//2. Tìm kiếm sản phẩm theo tên
const findProducts = document.querySelector("#form-search")

if(findProducts){
    let url = new URL(window.location.href)
    findProducts.addEventListener("submit", (event)=>{
        event.preventDefault();
        const keyword = event.target.elements.keyword.value
        if(keyword){
            url.searchParams.set("keyword",keyword)
        }else{
            url.searchParams.delete("keyword")
        }
        window.location.href = url.href
    })
}

//3. Phân trang sản phẩm
const buttonPagination = document.querySelectorAll("[button-pagination]")
if(buttonPagination){
    let url = new URL(window.location.href)
    buttonPagination.forEach(button=>{
        button.addEventListener("click", ()=>{
            const page = button.getAttribute("button-pagination")
            url.searchParams.set("page", page)
            window.location.href=url.href
        })
    })
}

//4. Xử lý logic các nút bấm
const checkboxMulti = document.querySelector("[checkbox-multi]")
if(checkboxMulti){
    const inputCheckAll = document.querySelector("input[name='checkall']")
    const inputCheckID = document.querySelectorAll("input[name='id']")
    
    inputCheckAll.addEventListener("click", ()=>{
        inputCheckID.forEach(button =>{
            button.checked = inputCheckAll.checked
        })
    })

    inputCheckID.forEach(button =>{
        button.addEventListener("click", ()=>{
            const status = Array.from(inputCheckID).every(button =>button.checked)
            inputCheckAll.checked = status
        })
    })
}

//5. Xử lý thay đổi trạng thái của nhiều sản phẩm
// Form Change Multi (Thay đổi trạng thái của nhiều sản phẩm)
const formChangeMulti = document.querySelector("[form-change-multi]")

if(formChangeMulti){
    formChangeMulti.addEventListener("submit", (event)=>{
        event.preventDefault();
        //const ids = event.target.elements.value
        const checkboxMulti = document.querySelector("[checkbox-multi]")
        const inputChecked = checkboxMulti.querySelectorAll(
            "input[name='id']:checked"
        ) //Lấy ra các sản phẩm đã được tích

        if(inputChecked.length > 0){
            let ids = []

            inputChecked.forEach(button =>{
                const id = button.value
                ids.push(id)
            })

            const inputForm = document.querySelector("input[name='ids']")
            inputForm.value = ids.join(",") //Truyền chuỗi các id của sản phẩm vào ô input để gửi lên server

            formChangeMulti.submit()

        }else{
            alert("Chọn ít nhất 1 bản ghi")
        }
    })
}