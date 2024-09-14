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
// Form Change Multi (Thay đổi trạng thái hoạt động/ ngừng hoạt động /xóa/ thay đổi vị trí => của nhiều sản phẩm)
const formChangeMulti = document.querySelector("[form-change-multi]")

if(formChangeMulti){
    formChangeMulti.addEventListener("submit", (event)=>{
        event.preventDefault();
        //const ids = event.target.elements.value
        const checkboxMulti = document.querySelector("[checkbox-multi]")
        const inputChecked = checkboxMulti.querySelectorAll(
            "input[name='id']:checked"
        ) //Lấy ra các sản phẩm đã được tích

        const typechange = event.target.elements.type.value
        if(typechange=="delete-all"){
            const inConFirm = confirm("Xóa các sản phẩm đã chọn")
            
            if(!inConFirm){
                return;
            }
        }

        if(inputChecked.length > 0){
            let ids = []

            inputChecked.forEach(button =>{
                const id = button.value
                if(typechange=="change-position"){
                    const position = button.closest("tr").querySelector("input[name='position']").value
                    ids.push(id + '-' + position)
                }else{
                    ids.push(id)
                }
            })

            const inputForm = document.querySelector("input[name='ids']")
            inputForm.value = ids.join(",") 

            formChangeMulti.submit()

        }else{
            alert("Chọn ít nhất 1 bản ghi")
        }
    })
}

//6 Xóa 1 sản phẩm
const buttonDelete = document.querySelectorAll("[button-delete]")
const formDeleteItem = document.querySelector("#form-delete-item")
if(buttonDelete.length > 0){
    const path = formDeleteItem.getAttribute("data-path")
    buttonDelete.forEach(button =>{
        button.addEventListener("click", (event)=>{
            const id = button.getAttribute("data-id")
            const newPath = path + `/${id}?_method=DELETE`

            formDeleteItem.action = newPath
            formDeleteItem.submit()
        })
    })
}

//7. xử lý thông báo thành công khi thay đổi
const showAlert = document.querySelector("[show-alert]")
if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"))
    const closeAlert = document.querySelector("[close-alert]")

    setTimeout(()=>{
        showAlert.classList.add("alert-hidden")
    }, time)

    closeAlert.addEventListener("click", ()=>{
        showAlert.classList.add("alert-hidden")
    })
}
