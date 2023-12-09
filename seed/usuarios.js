import bcrypt from 'bcrypt';
const usuarios = [
    {
        nombre: 'Mariano Islas',
        email: 'marianoislasblocvs1@utxicotepec.edu.mx',
        password: bcrypt.hashSync('password',10),
        token: null,
        confirmado: 1
    },
    {
        nombre: 'Alejandro Jjajja',
        email: 'alejandroajjablocvs1@utxicotepec.edu.mx',
        password: bcrypt.hashSync('password',10),
        token: null,
        confirmado: 1
    },
    {
        nombre: 'Yulissa Ortega',
        email: 'yuliortegablocvs1@utxicotepec.edu.mx',
        password: bcrypt.hashSync('password',10),
        token: null,
        confirmado: 1
    },
    {
        nombre: 'Haziel Ramirez',
        email: 'yayoblocvs1@utxicotepec.edu.mx',
        password: bcrypt.hashSync('password',10),
        token: null,
        confirmado: 1
    },
    {
        nombre: 'Irving Morales',
        email: 'mordoblocvs1@utxicotepec.edu.mx',
        password: bcrypt.hashSync('password',10),
        token: null,
        confirmado: 1
    },
    {
        nombre: 'Jesus Carballo',
        email: 'carballitoblocvs1@utxicotepec.edu.mx',
        password: bcrypt.hashSync('password',10),
        token: null,
        confirmado: 1
    },
    {
        nombre: 'Gris Franco',
        email: 'francogrisblocvs1@utxicotepec.edu.mx',
        password: bcrypt.hashSync('password',10),
        token: null,
        confirmado: 1
    },
    {
        nombre: 'Emiliano Islas',
        email: 'islasemilianoblocvs1@utxicotepec.edu.mx',
        password: bcrypt.hashSync('password',10),
        token: null,
        confirmado: 1
    },
    {
        nombre: 'Marco Ramírez',
        email: 'marcoloversblocvs1@utxicotepec.edu.mx',
        password: bcrypt.hashSync('password',10),
        token: null,
        confirmado: 1
    },
    {
        nombre: 'Romero Gonzales',
        email: 'aleromeblocvs1@utxicotepec.edu.mx',
        password: bcrypt.hashSync('password',10),
        token: null,
        confirmado: 1
    }
]
export default usuarios;