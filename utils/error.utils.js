module.exports.signUpErrors = (err) => {
    let errors = { pseudo: "", email: "", password: "mauvais mot de passe"}

    if(err.message.includes('pseudo'))
        errors.pseudo = "pseudo incorrect ou déja utilisé";

    if(err.message.includes("email"))
        errors.email = "adresse mail incorrecte";

    if(err.message.includes("password"))
        errors.email = "Le mot de passe doit faire 6 caractères minimum."

    if(err.code === 11000 && err.message.includes("email"))
        errors.email = "Cet email est déja enregistré."

    return errors
}