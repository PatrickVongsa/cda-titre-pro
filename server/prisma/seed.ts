import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  //piste_status
  const piste_status = await prisma.prospect_status.createMany({
    data: [
      {
        name: 'Nouveau',
        color: '#FFFFFF',
        order_number: 1,
        is_archived: false,
      },
      {
        name: 'Assigné',
        color: '#FFE600',
        order_number: 2,
        is_archived: false,
      },
      {
        name: 'En cours',
        color: '#FF8A00',
        order_number: 3,
        is_archived: false,
      },
      {
        name: 'Gagné',
        color: '#1FD701',
        order_number: 4,
        is_archived: false,
      },
    ],
  });

  //activity
  const activity = await prisma.activity.createMany({
    data: [
      { name: 'Boulanger', is_archived: false },
      { name: 'Peintre', is_archived: false },
      { name: 'Publicité', is_archived: false },
      { name: 'Avocat', is_archived: false },
      { name: 'Autres', is_archived: false },
    ],
  });

  //source
  const source = await prisma.source.createMany({
    data: [
      {
        name: 'Partenaire',
        is_archived: false,
      },
      {
        name: 'Prospection',
        is_archived: false,
      },
      {
        name: 'Bouche à oreille',
        is_archived: false,
      },
      {
        name: 'Autres',
        is_archived: false,
      },
    ],
  });

  //user
  const user = await prisma.user.createMany({
    data: [
      {
        firstname: 'Seif',
        lastname: 'Al-Yakoob',
        address: '123 BIS, rue de la place',
        postal_code: '31000',
        city: 'Toulouse',
        occupation: 'Président',
        contrat_type: 'Associé',
        email: 'seif.alyakoob@webgo-agency.com',
        password: 'admin1234',
        phone: '0681281553',
        is_archived: false,
      },
      {
        firstname: 'Emmanuel',
        lastname: 'Rodriguez',
        address: '546 BIS, rue du puits',
        postal_code: '31000',
        city: 'Toulouse',
        occupation: 'Développeur web',
        contrat_type: 'Associé',
        email: 'emmanuel.rodriguez@webgo-agency.com',
        password: 'admin1234',
        phone: '0681281553',
        is_archived: false,
      },
      {
        firstname: 'Patrick',
        lastname: 'Vongsa',
        address: '789 BIS, rue de la poterie',
        postal_code: '31000',
        city: 'Toulouse',
        occupation: 'Développeur web',
        contrat_type: 'Associé',
        email: 'patrick.vongsa@webgo-agency.com',
        password: 'admin1234',
        phone: '0681281553',
        is_archived: false,
      },
      {
        firstname: 'Vincent',
        lastname: 'Vaur',
        address: '12 BIS, rue du phare',
        postal_code: '31000',
        city: 'Toulouse',
        occupation: 'CTO',
        contrat_type: 'Freelance',
        email: 'vincent.vaur@webgo-agency.com',
        password: 'admin1234',
        phone: '0681281553',
        is_archived: false,
      },
    ],
  });

  //prospect
  const prospect = await prisma.prospect.createMany({
    data: [
      {
        company_name: 'Chocolaterie Belin',
        address: '123, rue de là-bas',
        postal_code: '81150',
        city: 'Marssac sur tarn',
        country: 'France',
        phone: '0563532269',
        email: 'belin@mail.com',
        company_logo: 'jest.jpg',
        website_url: 'dfdfdfdfdf.com',
        facebook_url: 'https://facebook.com/dfdfdfdfdf',
        instagram_url: 'https://instagram.com/dfdfdfdfdf',
        linkedin_url: 'https://linkedin.com/dfdfdfdfdf',
        contacted_at: new Date('2017-06-01T08:30'),
        estimate_budget: 3000,
        need_description: 'ceci est une description qui décrit le besoin de la dfdfdfdfdf en question',
        has_website: true,
        website_year: 2020,
        other_need: 'ceci est une description qui décrit un autre besoin de la dfdfdfdfdf en question',
        is_client: false,
        siret_number: '12345678901234',
        prospect_status_id: 2,
        source_id: 2,
        activity_id: 2,
        is_archived: false,
      },
      {
        company_name: 'La mie caline',
        address: '123, place du vigan',
        postal_code: '81000',
        city: 'Albi',
        country: 'France',
        phone: '0563532269',
        email: 'lamiecaline@mail.com',
        company_logo: 'jest.jpg',
        website_url: 'dfdfdfdfdf.com',
        facebook_url: 'https://facebook.com/dfdfdfdfdf',
        instagram_url: 'https://instagram.com/dfdfdfdfdf',
        linkedin_url: 'https://linkedin.com/dfdfdfdfdf',
        contacted_at: new Date('2017-06-01T08:30'),
        estimate_budget: 3000,
        need_description: 'ceci est une description qui décrit le besoin de la dfdfdfdfdf en question',
        has_website: true,
        website_year: 2020,
        other_need: 'ceci est une description qui décrit un autre besoin de la dfdfdfdfdf en question',
        is_client: true,
        siret_number: '12345678901234',
        prospect_status_id: 4,
        source_id: 2,
        activity_id: 2,
        is_archived: false,
      },
      {
        company_name: 'Cov & Stick',
        address: '123, parking de Lidl',
        postal_code: '81000',
        city: 'Carmaux',
        country: 'France',
        phone: '0563532269',
        email: 'covandstick@mail.com',
        company_logo: 'jest.jpg',
        website_url: 'dfdfdfdfdf.com',
        facebook_url: 'https://facebook.com/dfdfdfdfdf',
        instagram_url: 'https://instagram.com/dfdfdfdfdf',
        linkedin_url: 'https://linkedin.com/dfdfdfdfdf',
        contacted_at: new Date('2017-06-01T08:30'),
        estimate_budget: 3000,
        need_description: 'ceci est une description qui décrit le besoin de la dfdfdfdfdf en question',
        has_website: true,
        website_year: 2020,
        other_need: 'ceci est une description qui décrit un autre besoin de la dfdfdfdfdf en question',
        is_client: true,
        siret_number: '12345678901234',
        prospect_status_id: 4,
        source_id: 2,
        activity_id: 2,
        is_archived: false,
      },
      {
        company_name: 'FNAC',
        address: '123, rue piétonne',
        postal_code: '81000',
        city: 'Albi',
        country: 'France',
        phone: '0563532269',
        email: 'fnac-albi@mail.com',
        company_logo: 'jest.jpg',
        website_url: 'dfdfdfdfdf.com',
        facebook_url: 'https://facebook.com/dfdfdfdfdf',
        instagram_url: 'https://instagram.com/dfdfdfdfdf',
        linkedin_url: 'https://linkedin.com/dfdfdfdfdf',
        contacted_at: new Date('2017-06-01T08:30'),
        estimate_budget: 3000,
        need_description: 'ceci est une description qui décrit le besoin de la dfdfdfdfdf en question',
        has_website: true,
        website_year: 2020,
        other_need: 'ceci est une description qui décrit un autre besoin de la dfdfdfdfdf en question',
        is_client: true,
        siret_number: '12345678901234',
        prospect_status_id: 4,
        source_id: 2,
        activity_id: 2,
        is_archived: false,
      },
    ],
  });

  //contact
  const contact = await prisma.contact.createMany({
    data: [
      {
        firstname: 'Jean',
        lastname: 'Jeanjean',
        occupation: 'Gérant',
        phone: '0601010101',
        email: 'terjean@email.com',
        is_prefered_contact: true,
        prospect_id: 1,
        is_archived: false,
      },
      {
        firstname: 'Jeanne',
        lastname: 'Darque',
        occupation: 'Community Manager',
        phone: '0602020202',
        email: 'jeanne.darque@email.com',
        is_prefered_contact: true,
        prospect_id: 2,
        is_archived: false,
      },
      {
        firstname: 'Pierre',
        lastname: 'Alaidifice',
        occupation: 'Maçon',
        phone: '0603030303',
        email: 'pierre.alaidifice@email.com',
        is_prefered_contact: true,
        prospect_id: 3,
        is_archived: false,
      },
      {
        firstname: 'Melissa',
        lastname: 'Nonepleurepa',
        occupation: 'Minikeums-oh-oh',
        phone: '0601010101',
        email: 'melissa.nonepleurepa@email.com',
        is_prefered_contact: true,
        prospect_id: 4,
        is_archived: false,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
