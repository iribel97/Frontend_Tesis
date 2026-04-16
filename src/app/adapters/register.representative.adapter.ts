export function adaptRegisRepresentative(formData: any): any {
    return {
        cedula: formData.ci,
        nombres: formData.name,
        apellidos: formData.last_name,
        correo: formData.email,
        password: formData.password,
        telefono: formData.phone,
        direccion: formData.address,
        nacimiento: formData.birth_date,
        genero: formData.gender,
        ocupacion: formData.company,
        empresa: formData.company,
        direccionEmpresa: formData.company_address,
        telefonoEmpresa: formData.company_phone
    };
}