import { ClientDTO } from '../models/DTOs/ClientDTO';
import { PropertiesValidator } from './PropertiesValidator';
import { ValidationError } from '../errors/ValidationError';

class ClientsPropertiesValidator extends PropertiesValidator
{
    private readonly nameRegex = /^\s*([A-Za-z]{1,}([\.,] |[-']| ))+[A-Za-z]+\.?\s*$/;
    // eslint-disable-next-line max-len
    private readonly birthdayRegex = /(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/gi;
    private readonly emailRegex = /^(\S+)@((?:(?:(?!-)[a-zA-Z0-9-]{1,62}[a-zA-Z0-9])\.)+[a-zA-Z0-9]{2,12})$/;
    private readonly cpfRegex = /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)/;

    private readonly allValidators =
        [
            this.validateName.bind(this),
            this.validateBirthday.bind(this),
            this.validateEmail.bind(this),
            this.validateCPF.bind(this)
        ];

    validateAll (client: ClientDTO)
    {
        const params =
        [
            client.name,
            client.birthday,
            client.email,
            client.cpf
        ];

        this.validateAllProperties(this.allValidators, params);
    }

    validateName (name: string)
    {
        if (name.length < 2)
        {
            throw new ValidationError('Nome do usuário deve possuir 2 ou mais caracteres.');
        }

        if (!this.nameRegex.test(name))
        {
            throw new ValidationError('Nome do usuário não pode ter números ou caracteres especiais, exceto: hífen, aspas simples e ponto.');
        }
    }

    validateBirthday (birthday: string)
    {
        if (!this.birthdayRegex.test(birthday))
        {
            throw new ValidationError('A data de aniversário deve possuir o formato: DD-MM-YYYY e deve ser uma data válida.');
        }
    }

    validateEmail (email: string)
    {
        if (!this.emailRegex.test(email))
        {
            throw new ValidationError('Favor providenciar email no formato: \'email@provedor.extensao\'.');
        }
    }

    validateCPF (cpf: string)
    {
        if (!this.cpfRegex.test(cpf))
        {
            throw new ValidationError('Favor providenciar CPF no formato: \'000.000.000-00\'.');
        }
    }
}

const clientsPropertiesValidator = new ClientsPropertiesValidator();
export { clientsPropertiesValidator };
