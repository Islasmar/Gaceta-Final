import Evento from './Evento.js';
import Categoria from './Categoria.js';
import Usuario from './Usuario.js';
import Mensaje from './Mensaje.js';

Evento.belongsTo(Categoria, {foreignKey: 'categoriaId'});
Evento.belongsTo(Usuario, {foreignKey: 'usuarioId'});
Evento.hasMany(Mensaje, {foreignKey: 'eventoId'});

Mensaje.belongsTo(Evento,{foreignKey: 'eventoId'});
Mensaje.belongsTo(Usuario,{foreignKey: 'usuarioId'});

export {
    Evento,
    Categoria,
    Usuario,
    Mensaje
}