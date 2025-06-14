import {Campo} from './Campo'
import useProveedor from "../hooks/useProveedor.js";
import {useEffect} from "react";

export const Proveedor = () => {


    const{

        getProveedor,
        setProveedores,
        proveedores,
        nombre,
        setNombre,
        descripcion,
        setDescripcion,

        openModal,
        validar,
        tituloModal,
        deleteProveedor,

    }=useProveedor();


    useEffect(()=>{
        setProveedores(getProveedor);
    },[])



    return (
        <>
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-4 offset-md-4">
                        <div className="d-grid mx-auto">
                            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalProducto" onClick={() => openModal(1)}>
                                <i className="fa-solid fa-circle-plus"></i>Añadir
                            </button>
                        </div>
                    </div>
                </div>


                <div className="col-12 col-lg-8 offset-lg-2">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Proveedor</th>
                                <th>Descripcion</th>

                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>

                            {
                                proveedores.map((proveedor,i) => (
                                    <tr key={proveedor.id}>
                                        <td>{i+1}</td>
                                        <td>{proveedor.nombre}</td>
                                        <td>{proveedor.descripcion}</td>

                                        <td>
                                            <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalProducto" onClick={()=>openModal(2,producto)}>
                                                <i className="fa-solid fa-edit"></i>
                                            </button>
                                            <button className="btn btn-danger" onClick={()=>deleteProveedor(proveedor.id)}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }











                            </tbody>
                        </table>
                    </div>
                </div>


                <div id="modalProducto" className="modal fade" aria-hidden="true" tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <label className="h5">{tituloModal}</label>
                            </div>
                            <div className="modal-body">


                                <Campo id="nombre" iconName="fa-solid fa-gift" inputType="text" placeholder="Nombre" onChange={(e)=>setNombre(e.target.value)} value={nombre}></Campo>
                                <Campo id="descripcion" iconName="fa-solid fa-comments" inputType="text" placeholder="Descripcion" onChange={(e)=>setDescripcion(e.target.value)} value={descripcion}></Campo>



                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-success" onClick={()=>validar()}><i className="fa-solid fa-floppy-disk"></i>Guardar</button>
                                <button id="btnCerrarModal" className="btn btn-danger" data-bs-dismiss="modal"><i className="fa-solid fa-circle-xmark"></i>Cerrar</button>
                            </div>



                        </div>

                    </div>
                </div>





            </div>
        </>
    )

}