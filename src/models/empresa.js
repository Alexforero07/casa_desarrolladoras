import mongoose from "mongoose";

const EmpresaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  correo: String,
  telefono: String,
  paginaWeb: String,
  imagen: Object, // puedes cambiarlo a Buffer si guardas binarios
});

// Evita recompilar el modelo si ya existe
export default mongoose.models.Empresa || mongoose.model("Empresa", EmpresaSchema);
