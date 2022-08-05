import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
import bcrypt from 'bcrypt'

console.log("test")
connectDB()

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    switch(req.method){
        case "POST":
            await register(req, res)
            break;
    }
}

const register = async (req, res) => {
  try {
    const { nume, prenume, email, telefon, password, cf_password } = req.body;

    const user = await User.findOne({ email });

    const telefon2 = await User.findOne({ telefon });

    if (user) {
      return res.status(400).json({ err: ': Acest email este folosit' });
    }
    if (telefon2) {
      return res.status(400).json({ err: ': Numar de telefon folosit' });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = new User({
      nume,
      prenume,
      email,
      telefon,
      password: passwordHash,
      cf_password
    });

    await newUser.save();
    res.json({ msg: ' Cont creat ' });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};