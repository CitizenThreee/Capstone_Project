import { expect } from 'chai';
import Validation from '../../backend/libraries/Validation.js';
const validate = new Validation();

describe('Validate Sign Up', () => {
    it('should pass with valid input', () => {
      const input = {
        email: 'abc123@gmail.com',
        cEmail: 'abc123@gmail.com',
        fname: 'Aedan',
        lname: 'Beisly',
        phone: '12345678',
        location: 'Mossburn',
        password: 'password132',
        cPassword: 'password132'
      };
  
      const result = validate.ValidateSignUp(input);
      expect(result.passed).to.be.true;
    });
  
    it('should fail with invalid email', () => {
      const input = {
        email: 'abc123-email',
        cEmail: 'abc123-email',
        fname: 'Aedan',
        lname: 'Beisly',
        phone: '12345678',
        location: 'Mossburn',
        password: 'password132',
        cPassword: 'password132'
      };
  
      const result = validate.ValidateSignUp(input);
      expect(result.passed).to.be.false;
      expect(result.email).to.equal('Email is not a valid email');
    });
  
    it('should fail if email confirmation does not match', () => {
      const input = {
        email: 'abc123@gmail.com',
        cEmail: 'abc12@gmail.com',
        fname: 'Aedan',
        lname: 'Beisly',
        phone: '12345678',
        location: 'Mossburn',
        password: 'password132',
        cPassword: 'password132'
      };
  
      const result = validate.ValidateSignUp(input);
      expect(result.passed).to.be.false;
      expect(result.cEmail).to.equal('Email confirmation does not match');
    });
  
    it('should fail if first name is empty', () => {
      const input = {
        email: 'abc123@gmail.com',
        cEmail: 'abc123@gmail.com',
        fname: '',
        lname: 'Beisly',
        phone: '12345678',
        location: 'Mossburn',
        password: 'password132',
        cPassword: 'password132'
      };
  
      const result = validate.ValidateSignUp(input);
      expect(result.passed).to.be.false;
      expect(result.fname).to.equal('First name cannot be empty');
    });
  
    it('should fail if last name is empty', () => {
      const input = {
        email: 'abc123@gmail.com',
        cEmail: 'abc123@gmail.com',
        fname: 'Aedan',
        lname: '',
        phone: '12345678',
        location: 'Mossburn',
        password: 'password132',
        cPassword: 'password132'
      };
  
      const result = validate.ValidateSignUp(input);
      expect(result.passed).to.be.false;
      expect(result.lname).to.equal('Last name cannot be empty');
    });
  
    it('should fail if phone number is invalid', () => {
      const input = {
        email: 'abc123@gmail.com',
        cEmail: 'abc123@gmail.com',
        fname: 'Aedan',
        lname: 'Beisly',
        phone: '123',
        location: 'Mossburn',
        password: 'password132',
        cPassword: 'password132'
      };
  
      const result = validate.ValidateSignUp(input);
      expect(result.passed).to.be.false;
      expect(result.phone).to.equal('Number is not a valid phone number');
    });
  
    it('should fail if location is empty', () => {
      const input = {
        email: 'abc123@gmail.com',
        cEmail: 'abc123@gmail.com',
        fname: 'Aedan',
        lname: 'Beisly',
        phone: '12345678',
        location: '',
        password: 'password132',
        cPassword: 'password132'
      };
  
      const result = validate.ValidateSignUp(input);
      expect(result.passed).to.be.false;
      expect(result.location).to.equal('Location cannot be empty');
    });
  
    it('should fail if password is invalid', () => {
      const input = {
        email: 'abc123@gmail.com',
        cEmail: 'abc123@gmail.com',
        fname: 'Aedan',
        lname: 'Beisly',
        phone: '12345678',
        location: 'Mossburn',
        password: 'abc123',
        cPassword: 'abc123'
      };
  
      const result = validate.ValidateSignUp(input);
      expect(result.passed).to.be.false;
      expect(result.password).to.equal('Password must be between 8 and 20 characters, and contain at least one number');
    });
  
    it('should fail if password confirmation does not match', () => {
      const input = {
        email: 'abc123@gmail.com',
        cEmail: 'abc123@gmail.com',
        fname: 'Aedan',
        lname: 'Beisly',
        phone: '12345678',
        location: 'Mossburn',
        password: 'password132',
        cPassword: 'password13'
      };
  
      const result = validate.ValidateSignUp(input);
      expect(result.passed).to.be.false;
      expect(result.cPassword).to.equal('Confirmation password does not match');
    });
  });