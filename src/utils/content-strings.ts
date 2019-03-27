// TODO: add translations
export const CONTENT_STRINGS = {
  index: {
    en: {
      writing: {
        title: `Blog`,
        button: `All Categories`
      },
      community: {
        title: `Team`,
        discord: {
          button: `Join the community`,
          subtitle: `Online`
        }
      },
      about: {
        title: 'We are Exodev',
        image: `/assets/about.png`,
        imagePlaceholder: `/assets/about-placeholder.png`,
        content: [
          `
          Exo Dev provides businesses with the software tools and mindset
          necessary to transform themselves into exponential organizations.
          `,
          `
          An <a href="https://exponentialorgs.com/">exponential organization</a>
          is a new breed of business proven to be capable of unlocking the
          abundance provided by emerging technologies and readily adaptable
          to a rapidly changing business environment. The term “exponential
          organization” has been coined for organizations whose impact (or
          output) is disproportionately large&mdash;at least 10x as
          large&mdash;compared to its peers because of the use of new
          organization techniques that leverage accelerating technologies.
          `,
          `
          Regardless of whether your current organization is an industry
          leader or a smaller player, it must transform itself if it is to
          thrive in the face of industry disruption from unexpected external
          sources. New players should build agility in from the start.
          <a href="https://www.openexo.com/">OpenExO</a> will guide you
          through the process of transforming your business into an
          exponential one, and <strong>ExO Dev</strong> will assist you
          with cutting-edge technical solutions.
          `
        ],
      },
      clients: {
        title: 'Recent Clients',
        content: [
          { name: 'Boston Scietific', logo: `/clients/boston-scientific.png`},
          { name: 'Rakuten', logo: `/clients/rakuten.svg`}
        ]
      },
      services: {
        title: 'Products + Services',
        content: []
      },
      products: {
        title: 'Products',
        content: []
      }
    },
    ja: {
      writing: {
        title: `Blog`,
        button: `すべてのカテゴリ`
      },
      community: {
        title: `Team`,
        discord: {
          button: `コミュニティに参加する`,
          subtitle: `オンライン`
        }
      },
      about: {
        title: 'We are Exodev',
        image: `/assets/about.png`,
        imagePlaceholder: `/assets/about-placeholder.png`,
        content: [
          `
          Exo Dev はあなたの組織をexponential organizations（飛躍型組織）へ変革するために必要なツールとマインドセットを提供します。
          `,
          `
          <a href="https://exponentialorgs.com/">exponential organizations</a>とは、
          最新テクノロジーを駆使し加速度的に変化するビジネス環境に迅速に対応できる能力を持った新しいタイプの企業です。
          「exponential organizations」という言葉は、最新技術に基づく新しい組織づくりの手法を駆使し、
          競合他社と比べて極めて大きい（少なくとも１０倍以上の）影響を生み出す組織を意味します。
          `,
          `
          異業種からの新規参入がもたらす予期せぬ業界変革の中組織を成長させていくためには、
          業界リーダー規模であるか小規模プレイヤーであるかを問わず自らも変革を遂げなければなりません。
          一方新規参入者は参入当初時から俊敏な組織を構築する必要があります。<a href="https://www.openexo.com/">OpenExO</a>は
          変革プロセスを通し飛躍型組織へと、ExO Devは最新テクノロジーを用いたソリューションを提供し、あなたのビジネスをアシストします。
          `
        ]
      },
      clients: {
        title: 'Recent Clients',
        content: [
          { name: 'Boston Scietific', logo: `/clients/boston-scientific.png`},
          { name: 'Rakuten', logo: `/clients/rakuten.svg`}
        ]
      },
      services: {
        title: 'Products + Services',
        content: []
      },
      products: {
        title: 'Products',
        content: []
      }
    }
  },
  footer: {
    en: {
      company: 'ExO Lever Asia GK',
      copyright: `&copy;&nbsp;${new Date().getFullYear()}.&nbsp;All Rights Reserved.`,
      build: 'Last Build'
    },
    ja: {
      company: 'ExO Lever Asia <span>合同会社</span>',
      copyright: `&copy;&nbsp;${new Date().getFullYear()}.&nbsp;全著作権所有.`,
      build: 'ピカピカが造'
    }
  }
}
