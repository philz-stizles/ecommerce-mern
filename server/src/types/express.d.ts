type User = {
  fullname: string;
  username: string;
  name: string;
  email: string;
  avatar?: string;
  password?: string;
  confirmPassword?: string;
  passwordChangedAt?: Date;
  passwordResetExpiresIn?: number;
  passwordResetToken: string | undefined;
  address: [];
  roles: PopulatedDoc<IRoleDocument & Document>[];
  isActive: boolean;
  tokens: IUserToken[];
  createdAt: string;
  updatedAt: string;
}

declare global {
  namespace Express {
    interface Request {
      user: Use;
      file: any;
    }
  }
}

declare global {
  namespace NodeJS {
    interface Global {
      __basedir: string;
    }
  }
}

export {}