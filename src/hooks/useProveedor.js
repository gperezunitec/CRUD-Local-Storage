import {useState} from "react";
import Swal from "sweetalert2";
import {alertaSucess,alertaWarning,alertaError} from "../alerta.js";


const useProveedor = () => {

    const [proveedores, setProveedores] = useState([]);
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const [tituloModal, setTituloModal] = useState('');
    const [operacion, setOperacion] = useState('');



    const getProveedor = () => {
        const localStorageProveedores=localStorage.getItem('PROVEEDORES');
        const parsedProveedores= localStorageProveedores ? JSON.parse(localStorageProveedores):[];
        return Array.isArray(parsedProveedores)? parsedProveedores: [];
    }




    const enviarSolicitud = (metodo,parametros={}) => {
        const saveUpdateProveedor = [...proveedores];
        let mensaje = ''
        if (metodo === 'POST') {
            saveUpdateProveedor.push({...parametros, id: Date.now()})
            mensaje = 'Proveedor ingresado correctamente'
        }else if(metodo==='PUT'){
            const proveedorIndex=saveUpdateProveedor.findIndex(proveedor=>proveedor.id===parametros.id)

            if(proveedorIndex !==-1){
                saveUpdateProveedor[proveedorIndex]={...parametros}
                mensaje='Proveedor actualizado correctamente'
            }

        }else if(metodo==='DELETE'){
            const proveedorArr=saveUpdateProveedor.filter(proveedor=>proveedor.id!==parametros.id);
            localStorage.setItem('PROVEEDORES',JSON.stringify(proveedorArr));
            alertaSucess('Proveedor eliminado correctamente');
            return
        }
        localStorage.setItem('PROVEEDORES',JSON.stringify(saveUpdateProveedor));
        setProveedores(saveUpdateProveedor);
        alertaSucess(mensaje);
        document.getElementById('btnCerrarModal').click();
    }

    const validar = () => {
        let metodo=''
        if(nombre===''){
            alertaWarning('Nombre del proveedor en blanco','nombre');
        }else if(descripcion===''){
            alertaWarning('Descripcion del proveedor en blanco','descripcion');
        }else{

            let payload={
                id:id||Date.now(),
                nombre:nombre,
                descripcion:descripcion,

            }

            if (operacion===1){
                metodo='POST';
            }else{
                metodo='PUT';
            }


            enviarSolicitud(metodo,payload);

        }

    }


    const deleteProveedor = (id) => {
        Swal.fire({
            title:'Esta seguro de eliminar el proveedor?',
            icon:'question',
            text: "No hay marcha atras",
            showCancelButton: true,
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                enviarSolicitud('DELETE',{id});
            }
        }).catch((error) => {
            alertaError(error);
        })
    }


    const openModal = (valorOperacion,proveedor) => {

        if(valorOperacion===1){
            setTituloModal('Registrar Proveedor')
            setId('')
            setNombre('')
            setDescripcion('')

            setOperacion(1)
        }else if(valorOperacion===2){
            setTituloModal('Editar Proveedor')
            setId(proveedor.id)
            setNombre(proveedor.nombre)
            setDescripcion(proveedor.descripcion)

            setOperacion(2)
        }

    }

    return{

        getProveedor,
        proveedores,
        setProveedores,
        nombre,
        setNombre,
        descripcion,
        setDescripcion,

        openModal,
        validar,
        tituloModal,
        deleteProveedor,

    }
}

export default useProveedor;
