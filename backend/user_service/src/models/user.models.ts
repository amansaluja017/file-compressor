import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    accessToken: {
        type: String,
        default: null
    },
    refreshToken: {
        type: String,
        default: null
    },
}, {timestamps: true});



userSchema.methods.comparePassword = async function(password: string | Buffer) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.gernateAccessToken = async function() {
    return await jwt.sign({id: this._id}, process.env.ACCESS_TOKEN_SECRET! as string, {expiresIn: "1d"})
}

userSchema.methods.gernateRefreshToken = async function() {
    return await jwt.sign({id: this._id}, process.env.REFRESH_TOKEN_SECRET! as string, {expiresIn: "7d"})
}

export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    isVerified: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    comparePassword: (password: string | Buffer) => Promise<boolean>;
    gernateAccessToken(): Promise<string>;
    gernateRefreshToken(): Promise<string>;
}

export const User = mongoose.model<IUser>('User', userSchema);