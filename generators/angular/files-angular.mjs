export const files = {
    angular: [
        {
            path: 'src/main/webapp/',
            templates: [
                // Layout files
                {
                    file: 'app/layouts/main/main.component.html.ejs',
                    method: 'template',
                    renameTo: () => 'app/layouts/main/main.component.html',
                },
                {
                    file: 'app/layouts/navbar/navbar.component.html.ejs',
                    method: 'template',
                    renameTo: () => 'app/layouts/navbar/navbar.component.html',
                },
                {
                    file: 'app/layouts/footer/footer.component.html.ejs',
                    method: 'template',
                    renameTo: () => 'app/layouts/footer/footer.component.html',
                },
                {
                    file: 'app/layouts/error/error.component.html.ejs',
                    method: 'template',
                    renameTo: () => 'app/layouts/error/error.component.html',
                },
                {
                    file: 'app/layouts/profiles/page-ribbon.component.html.ejs',
                    method: 'template',
                    renameTo: () => 'app/layouts/profiles/page-ribbon.component.html',
                },

                // Home Component
                {
                    file: 'app/home/home.component.html.ejs',
                    method: 'template',
                    renameTo: () => 'app/home/home.component.html',
                },
                
                // SCSS Core files
                {
                    file: 'content/scss/_bootstrap.scss.ejs',
                    method: 'template',
                    renameTo: () => 'content/scss/_bootstrap.scss',
                },
                {
                    file: 'content/scss/_variables.scss.ejs',
                    method: 'template',
                    renameTo: () => 'content/scss/_variables.scss',
                },
                {
                    file: 'content/scss/global.scss.ejs',
                    method: 'template',
                    renameTo: () => 'content/scss/global.scss',
                },

                // SCSS Component files
                {
                    file: 'content/scss/components/_layout.scss.ejs',
                    method: 'template',
                    renameTo: () => 'content/scss/components/_layout.scss',
                },
                {
                    file: 'content/scss/components/_common.scss.ejs',
                    method: 'template',
                    renameTo: () => 'content/scss/components/_common.scss',
                },
                {
                    file: 'content/scss/components/_entities.scss.ejs',
                    method: 'template',
                    renameTo: () => 'content/scss/components/_entities.scss',
                },

                // // Entity templates
                // {
                //     file: 'app/entities/_common/list/entity-list.component.html.ejs',
                //     method: 'template',
                //     renameTo: (data) => `app/entities/${data.entityFolderName}/list/${data.entityFileName}.component.html`,
                // },
                // {
                //     file: 'app/entities/_common/list/entity-list.component.ts.ejs',
                //     method: 'template',
                //     renameTo: (data) => `app/entities/${data.entityFolderName}/list/${data.entityFileName}.component.ts`,
                // },
                // {
                //     file: 'app/entities/_common/detail/entity-detail.component.html.ejs',
                //     method: 'template',
                //     renameTo: (data) => `app/entities/${data.entityFolderName}/detail/${data.entityFileName}-detail.component.html`,
                // },
                // {
                //     file: 'app/entities/_common/detail/entity-detail.component.ts.ejs',
                //     method: 'template',
                //     renameTo: (data) => `app/entities/${data.entityFolderName}/detail/${data.entityFileName}-detail.component.ts`,
                // },
                // {
                //     file: 'app/entities/_common/update/entity-update.component.html.ejs',
                //     method: 'template',
                //     renameTo: (data) => `app/entities/${data.entityFolderName}/update/${data.entityFileName}-update.component.html`,
                // },
                // {
                //     file: 'app/entities/_common/update/entity-update.component.ts.ejs',
                //     method: 'template',
                //     renameTo: (data) => `app/entities/${data.entityFolderName}/update/${data.entityFileName}-update.component.ts`,
                // },
            ],
        },
    ],
}; 