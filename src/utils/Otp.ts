import otpGenerator from 'otp-generator'


export const generateOtp = ()=>{
    const OTP = otpGenerator.generate(3, {upperCaseAlphabets:false, specialChars:true})
    return OTP;
}

