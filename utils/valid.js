const valid = (nume, email, password, cf_password) => {
  if(!nume || !email || !password)
  return 'Please add all fields.'
  // console.log(nume, email, password, cf_password)
  
  if(password.length < 6)
  return 'Password must be at least 6 characters.'

  if(password !== cf_password)
  return 'Confirm password did not match.'
}

export default valid