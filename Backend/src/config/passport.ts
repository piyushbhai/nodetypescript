import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Users } from '../models/user';
import bcrypt from 'bcrypt';

passport.use(
  new LocalStrategy(async (email, password, done) => {
    console.log(email, password); 
    
    try {
      const user = await Users.findOne({ where: { email } });
      console.log(user); 
      
      if (!user) {
        return done(null, false, { message: 'Incorrect email' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return done(null, false, { message: 'Incorrect password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await Users.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport