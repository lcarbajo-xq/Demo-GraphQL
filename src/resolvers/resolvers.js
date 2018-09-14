const Curso = require('../../models/Curso')
const Profesor = require('../../models/Profesor')

const resolvers = {
    Query: {
        cursos: () => Curso.query().eager('[profesor, comentarios]'),
        profesores: () => Profesor.query().eager('cursos'),
        curso: (rootValue, args) => Curso.query().eager('[profesor, comentarios]').findById(args.id),
        profesor: (rootValue, args) => Profesor.query().eager('cursos').findById(args.id),
        search: (_,args) => {
            return [
                Profesor.query().findById(1),
                Curso.query().findById(1)
            ]
        }
    },
    SearchResult: {
        __resolveType: (obj) => {
            if(obj.nombre) return 'Profesor'
            return 'Curso'
        }
    },
    Mutation: {
        profesorAdd: (_, args) => {
            return Profesor.query().insert(args.profesor)
        },
        profesorEdit: (_, args) => {
            return Profesor.query().patchAndFetchById(args.profesorId, args.profesor)        
        },
        profesorDelete: (_, args) => {
            return Profesor.query().findById(args.profesorId).then((profesor) => {
                return Profesor.query().deleteById(args.profesorId).then((deletedRows) => {
                    if (deletedRows > 0) return profesor
                    throw new Error (`El profesor ${args.profesorId} no pudo ser borrado`)
                })
            })
        },
        cursoAdd: (_, args) => {
            return Curso.query().insert(args.curso)
        },
        cursoEdit: (_, args) => {
            return Curso.query().patchAndFetchById(args.cursoId, args.curso)        
        },
        cursoDelete: (_, args) => {
            return Curso.query().findById(args.cursoId).then((curso) => {
                return Curso.query().deleteById(args.cursoId).then((deletedRows) => {
                    if (deletedRows > 0) return curso
                    throw new Error (`El curso ${args.cursoId} no pudo ser borrado`)
                })
            })
        }
    }
}    

module.exports = resolvers