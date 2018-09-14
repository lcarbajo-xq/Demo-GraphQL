module.exports=`
    type Curso {
        id: ID!
        titulo: String!
        descripcion: String!
        comentarios: [Comentario]
        profesor: Profesor
        rating: Float @deprecated(reason: "No será necesario")
    }
    type Comentario {
        id: ID!
        nombre: String!
        cuerpo: String!
    }
    input NuevoCurso {
        titulo: String! 
        descripcion: String! 
    }
    input cursoEditable {
        titulo: String
        descripcion: String 
    }
`