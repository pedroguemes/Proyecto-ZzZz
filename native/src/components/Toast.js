import Swal from 'sweetalert2'
const toasty = (icon, title) =>{
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      })

      Toast.fire({
        icon: icon,
        title: title,
        background: '#1f1f36',
        color: 'white'
      })
}

export default toasty 