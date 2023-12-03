import bcrypt from 'bcrypt';
const usuarios = [
    {
        nombre: 'Mariano Islas',
        email: 'marianoislasblocvs1@gamail.com',
        password: bcrypt.hashSync('password',10),
        token: null,
        confirmado: 1
    },
    {
        nombre: 'Alejandro Jjajja',
        email: 'alejandroajjablocvs1@gamail.com',
        password: bcrypt.hashSync('password',10),
        token: null,
        confirmado: 1
    },
    {
        nombre: 'Yulissa Ortega',
        email: 'yuliortegablocvs1@gamail.com',
        password: bcrypt.hashSync('password',10),
        token: null,
        confirmado: 1
    },
    {
        nombre: 'Haziel Ramirez',
        email: 'yayoblocvs1@gamail.com',
        password: bcrypt.hashSync('password',10),
        token: null,
        confirmado: 1
    },
    {
        nombre: 'Irving Morales',
        email: 'mordoblocvs1@gamail.com',
        password: bcrypt.hashSync('password',10),
        token: null,
        confirmado: 1
    },
    {
        nombre: 'Jesus Carballo',
        email: 'carballitoblocvs1@gamail.com',
        password: bcrypt.hashSync('password',10),
        token: null,
        confirmado: 1
    },
    {
        nombre: 'Gris Franco',
        email: 'francogrisblocvs1@gamail.com',
        password: bcrypt.hashSync('password',10),
        token: null,
        confirmado: 1
    },
    {
        nombre: 'Emiliano Islas',
        email: 'islasemilianoblocvs1@gamail.com',
        password: bcrypt.hashSync('password',10),
        token: null,
        confirmado: 1
    },
    {
        nombre: 'Marco Ramírez',
        email: 'marcoloversblocvs1@gamail.com',
        password: bcrypt.hashSync('password',10),
        token: null,
        confirmado: 1
    },
    {
        nombre: 'Romero Gonzales',
        email: 'aleromeblocvs1@gamail.com',
        password: bcrypt.hashSync('password',10),
        token: null,
        confirmado: 1
    }
]
export default usuarios;