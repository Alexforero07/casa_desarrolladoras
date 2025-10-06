import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const nombre = searchParams.get("nombre");

    await client.connect();
    const db = client.db("empresas");
    const collection = db.collection("empresas");

    let empresas;

    if (nombre) {
      // búsqueda por nombre
      empresas = await collection.find({
        nombre: { $regex: nombre, $options: "i" }
      }).toArray();
    } else {
      // todas las empresas
      empresas = await collection.find({}).toArray();
    }

    if (!empresas.length) {
      return new Response(JSON.stringify({ error: "No hay empresas" }), { status: 404 });
    }

    return new Response(JSON.stringify(empresas), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error en el servidor" }), { status: 500 });
  }
}
