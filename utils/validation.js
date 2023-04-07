export const validateEmail=(email)=>{
    const regexSt=/^([-!#-\'*+\/-9=?A-Z^-~]{1,64}(\.[-!#-\'*+\/-9=?A-Z^-~]{1,64})*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+$/
    return regexSt.test(email);
}