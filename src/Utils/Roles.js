export function RoleMaker(R) {
  let roles = {
    SAdmin:0, 'Asesor Sr':1, 'Asesor Jr':1, 'Contador auxiliar':2, 
     Practcante:2, Administracion:0
  }
  return (3 - roles[R])
}