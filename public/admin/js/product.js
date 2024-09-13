
//Xử lý thay đổi trạng thái 1 sản phẩm
const buttonChangeStatus = document.querySelectorAll("[button-change-status]")
const formChangeStatus = document.querySelector("#form-change-status")

if(buttonChangeStatus.length > 0){
    buttonChangeStatus.forEach(button =>{
        button.addEventListener("click", (e)=>{
            const statusCurrent = button.getAttribute("data-status")
            const id = button.getAttribute("data-id")
            const newStatus = statusCurrent=="active" ? "inactive" : "active"

            const path = formChangeStatus.getAttribute("data-path")

            const newPath  = path + `/${newStatus}/${id}?_method=PATCH`//_method=PATCH : phương thức gửi lên là phương thức PATCH
            formChangeStatus.action = newPath

            formChangeStatus.submit()
        })
    })
}
