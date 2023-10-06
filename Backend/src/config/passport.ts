import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Users } from '../models/user';
import bcrypt from 'bcrypt';

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await Users.findOne({ where: { username } });

      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
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
