'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-0af61f4543e6511547ce45daa01f66e5019f2a6ade9705d1698fff179de904863c960de382d76fe75f137c5203ebcb4c70120784fb0362e87f5e42ce32f5d675"' : 'data-target="#xs-controllers-links-module-AppModule-0af61f4543e6511547ce45daa01f66e5019f2a6ade9705d1698fff179de904863c960de382d76fe75f137c5203ebcb4c70120784fb0362e87f5e42ce32f5d675"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-0af61f4543e6511547ce45daa01f66e5019f2a6ade9705d1698fff179de904863c960de382d76fe75f137c5203ebcb4c70120784fb0362e87f5e42ce32f5d675"' :
                                            'id="xs-controllers-links-module-AppModule-0af61f4543e6511547ce45daa01f66e5019f2a6ade9705d1698fff179de904863c960de382d76fe75f137c5203ebcb4c70120784fb0362e87f5e42ce32f5d675"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-0af61f4543e6511547ce45daa01f66e5019f2a6ade9705d1698fff179de904863c960de382d76fe75f137c5203ebcb4c70120784fb0362e87f5e42ce32f5d675"' : 'data-target="#xs-injectables-links-module-AppModule-0af61f4543e6511547ce45daa01f66e5019f2a6ade9705d1698fff179de904863c960de382d76fe75f137c5203ebcb4c70120784fb0362e87f5e42ce32f5d675"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-0af61f4543e6511547ce45daa01f66e5019f2a6ade9705d1698fff179de904863c960de382d76fe75f137c5203ebcb4c70120784fb0362e87f5e42ce32f5d675"' :
                                        'id="xs-injectables-links-module-AppModule-0af61f4543e6511547ce45daa01f66e5019f2a6ade9705d1698fff179de904863c960de382d76fe75f137c5203ebcb4c70120784fb0362e87f5e42ce32f5d675"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BookingsModule.html" data-type="entity-link" >BookingsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-BookingsModule-33ab83eef7ce0bf37f2e7a35866ec9d09be564af5435cc3ce379272d6a69dad2766f36058e3a123eb623bf1f3cf7208bdb45b4393f113087a65c9b715603011c"' : 'data-target="#xs-controllers-links-module-BookingsModule-33ab83eef7ce0bf37f2e7a35866ec9d09be564af5435cc3ce379272d6a69dad2766f36058e3a123eb623bf1f3cf7208bdb45b4393f113087a65c9b715603011c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BookingsModule-33ab83eef7ce0bf37f2e7a35866ec9d09be564af5435cc3ce379272d6a69dad2766f36058e3a123eb623bf1f3cf7208bdb45b4393f113087a65c9b715603011c"' :
                                            'id="xs-controllers-links-module-BookingsModule-33ab83eef7ce0bf37f2e7a35866ec9d09be564af5435cc3ce379272d6a69dad2766f36058e3a123eb623bf1f3cf7208bdb45b4393f113087a65c9b715603011c"' }>
                                            <li class="link">
                                                <a href="controllers/BookingsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookingsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-BookingsModule-33ab83eef7ce0bf37f2e7a35866ec9d09be564af5435cc3ce379272d6a69dad2766f36058e3a123eb623bf1f3cf7208bdb45b4393f113087a65c9b715603011c"' : 'data-target="#xs-injectables-links-module-BookingsModule-33ab83eef7ce0bf37f2e7a35866ec9d09be564af5435cc3ce379272d6a69dad2766f36058e3a123eb623bf1f3cf7208bdb45b4393f113087a65c9b715603011c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BookingsModule-33ab83eef7ce0bf37f2e7a35866ec9d09be564af5435cc3ce379272d6a69dad2766f36058e3a123eb623bf1f3cf7208bdb45b4393f113087a65c9b715603011c"' :
                                        'id="xs-injectables-links-module-BookingsModule-33ab83eef7ce0bf37f2e7a35866ec9d09be564af5435cc3ce379272d6a69dad2766f36058e3a123eb623bf1f3cf7208bdb45b4393f113087a65c9b715603011c"' }>
                                        <li class="link">
                                            <a href="injectables/BookingsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookingsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CloudinaryModule.html" data-type="entity-link" >CloudinaryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CloudinaryModule-4c3e436d06ef61a1290a4876f3acfcafc430405eccd4e19b99c80a0d44282fbb6efe4401a655964d34b888cd3871b05ffdddf4ccaa4f5c665b5bd7c79d6e1e16"' : 'data-target="#xs-controllers-links-module-CloudinaryModule-4c3e436d06ef61a1290a4876f3acfcafc430405eccd4e19b99c80a0d44282fbb6efe4401a655964d34b888cd3871b05ffdddf4ccaa4f5c665b5bd7c79d6e1e16"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CloudinaryModule-4c3e436d06ef61a1290a4876f3acfcafc430405eccd4e19b99c80a0d44282fbb6efe4401a655964d34b888cd3871b05ffdddf4ccaa4f5c665b5bd7c79d6e1e16"' :
                                            'id="xs-controllers-links-module-CloudinaryModule-4c3e436d06ef61a1290a4876f3acfcafc430405eccd4e19b99c80a0d44282fbb6efe4401a655964d34b888cd3871b05ffdddf4ccaa4f5c665b5bd7c79d6e1e16"' }>
                                            <li class="link">
                                                <a href="controllers/CloudinaryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CloudinaryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CloudinaryModule-4c3e436d06ef61a1290a4876f3acfcafc430405eccd4e19b99c80a0d44282fbb6efe4401a655964d34b888cd3871b05ffdddf4ccaa4f5c665b5bd7c79d6e1e16"' : 'data-target="#xs-injectables-links-module-CloudinaryModule-4c3e436d06ef61a1290a4876f3acfcafc430405eccd4e19b99c80a0d44282fbb6efe4401a655964d34b888cd3871b05ffdddf4ccaa4f5c665b5bd7c79d6e1e16"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CloudinaryModule-4c3e436d06ef61a1290a4876f3acfcafc430405eccd4e19b99c80a0d44282fbb6efe4401a655964d34b888cd3871b05ffdddf4ccaa4f5c665b5bd7c79d6e1e16"' :
                                        'id="xs-injectables-links-module-CloudinaryModule-4c3e436d06ef61a1290a4876f3acfcafc430405eccd4e19b99c80a0d44282fbb6efe4401a655964d34b888cd3871b05ffdddf4ccaa4f5c665b5bd7c79d6e1e16"' }>
                                        <li class="link">
                                            <a href="injectables/CloudinaryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CloudinaryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FlightsModule.html" data-type="entity-link" >FlightsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-FlightsModule-ba2f1c111940b1979806a5f0c50e3b4ad1401a32990d1bcfe9d07479bbae2c3964c11680fda1dc8b040534d16ad6ab6f458016e05a3b237e4e134d630281f480"' : 'data-target="#xs-controllers-links-module-FlightsModule-ba2f1c111940b1979806a5f0c50e3b4ad1401a32990d1bcfe9d07479bbae2c3964c11680fda1dc8b040534d16ad6ab6f458016e05a3b237e4e134d630281f480"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FlightsModule-ba2f1c111940b1979806a5f0c50e3b4ad1401a32990d1bcfe9d07479bbae2c3964c11680fda1dc8b040534d16ad6ab6f458016e05a3b237e4e134d630281f480"' :
                                            'id="xs-controllers-links-module-FlightsModule-ba2f1c111940b1979806a5f0c50e3b4ad1401a32990d1bcfe9d07479bbae2c3964c11680fda1dc8b040534d16ad6ab6f458016e05a3b237e4e134d630281f480"' }>
                                            <li class="link">
                                                <a href="controllers/FlightsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FlightsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FlightsModule-ba2f1c111940b1979806a5f0c50e3b4ad1401a32990d1bcfe9d07479bbae2c3964c11680fda1dc8b040534d16ad6ab6f458016e05a3b237e4e134d630281f480"' : 'data-target="#xs-injectables-links-module-FlightsModule-ba2f1c111940b1979806a5f0c50e3b4ad1401a32990d1bcfe9d07479bbae2c3964c11680fda1dc8b040534d16ad6ab6f458016e05a3b237e4e134d630281f480"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FlightsModule-ba2f1c111940b1979806a5f0c50e3b4ad1401a32990d1bcfe9d07479bbae2c3964c11680fda1dc8b040534d16ad6ab6f458016e05a3b237e4e134d630281f480"' :
                                        'id="xs-injectables-links-module-FlightsModule-ba2f1c111940b1979806a5f0c50e3b4ad1401a32990d1bcfe9d07479bbae2c3964c11680fda1dc8b040534d16ad6ab6f458016e05a3b237e4e134d630281f480"' }>
                                        <li class="link">
                                            <a href="injectables/FlightsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FlightsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PassengersModule.html" data-type="entity-link" >PassengersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PassengersModule-dea01e9656071d0ff909ab2a0e49a4f60b7d20af9c6af9fc9c743a67eb06e05503515dfce5f54e36a645ca96a85e4e990b2551f5d72277af9704b2a63113a713"' : 'data-target="#xs-controllers-links-module-PassengersModule-dea01e9656071d0ff909ab2a0e49a4f60b7d20af9c6af9fc9c743a67eb06e05503515dfce5f54e36a645ca96a85e4e990b2551f5d72277af9704b2a63113a713"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PassengersModule-dea01e9656071d0ff909ab2a0e49a4f60b7d20af9c6af9fc9c743a67eb06e05503515dfce5f54e36a645ca96a85e4e990b2551f5d72277af9704b2a63113a713"' :
                                            'id="xs-controllers-links-module-PassengersModule-dea01e9656071d0ff909ab2a0e49a4f60b7d20af9c6af9fc9c743a67eb06e05503515dfce5f54e36a645ca96a85e4e990b2551f5d72277af9704b2a63113a713"' }>
                                            <li class="link">
                                                <a href="controllers/PassengersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PassengersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PassengersModule-dea01e9656071d0ff909ab2a0e49a4f60b7d20af9c6af9fc9c743a67eb06e05503515dfce5f54e36a645ca96a85e4e990b2551f5d72277af9704b2a63113a713"' : 'data-target="#xs-injectables-links-module-PassengersModule-dea01e9656071d0ff909ab2a0e49a4f60b7d20af9c6af9fc9c743a67eb06e05503515dfce5f54e36a645ca96a85e4e990b2551f5d72277af9704b2a63113a713"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PassengersModule-dea01e9656071d0ff909ab2a0e49a4f60b7d20af9c6af9fc9c743a67eb06e05503515dfce5f54e36a645ca96a85e4e990b2551f5d72277af9704b2a63113a713"' :
                                        'id="xs-injectables-links-module-PassengersModule-dea01e9656071d0ff909ab2a0e49a4f60b7d20af9c6af9fc9c743a67eb06e05503515dfce5f54e36a645ca96a85e4e990b2551f5d72277af9704b2a63113a713"' }>
                                        <li class="link">
                                            <a href="injectables/PassengersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PassengersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SeatsModule.html" data-type="entity-link" >SeatsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SeatsModule-42c59f910bab30bba7b91e6dc4d37cf9dffe1614d191fffc1a6a3cb911072578d7bb25ae29a71d342d6d3863d4d126ff994175ad3e5ac43a6b3420d35ff138ce"' : 'data-target="#xs-controllers-links-module-SeatsModule-42c59f910bab30bba7b91e6dc4d37cf9dffe1614d191fffc1a6a3cb911072578d7bb25ae29a71d342d6d3863d4d126ff994175ad3e5ac43a6b3420d35ff138ce"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SeatsModule-42c59f910bab30bba7b91e6dc4d37cf9dffe1614d191fffc1a6a3cb911072578d7bb25ae29a71d342d6d3863d4d126ff994175ad3e5ac43a6b3420d35ff138ce"' :
                                            'id="xs-controllers-links-module-SeatsModule-42c59f910bab30bba7b91e6dc4d37cf9dffe1614d191fffc1a6a3cb911072578d7bb25ae29a71d342d6d3863d4d126ff994175ad3e5ac43a6b3420d35ff138ce"' }>
                                            <li class="link">
                                                <a href="controllers/SeatsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SeatsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SeatsModule-42c59f910bab30bba7b91e6dc4d37cf9dffe1614d191fffc1a6a3cb911072578d7bb25ae29a71d342d6d3863d4d126ff994175ad3e5ac43a6b3420d35ff138ce"' : 'data-target="#xs-injectables-links-module-SeatsModule-42c59f910bab30bba7b91e6dc4d37cf9dffe1614d191fffc1a6a3cb911072578d7bb25ae29a71d342d6d3863d4d126ff994175ad3e5ac43a6b3420d35ff138ce"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SeatsModule-42c59f910bab30bba7b91e6dc4d37cf9dffe1614d191fffc1a6a3cb911072578d7bb25ae29a71d342d6d3863d4d126ff994175ad3e5ac43a6b3420d35ff138ce"' :
                                        'id="xs-injectables-links-module-SeatsModule-42c59f910bab30bba7b91e6dc4d37cf9dffe1614d191fffc1a6a3cb911072578d7bb25ae29a71d342d6d3863d4d126ff994175ad3e5ac43a6b3420d35ff138ce"' }>
                                        <li class="link">
                                            <a href="injectables/SeatsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SeatsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SettingsModule.html" data-type="entity-link" >SettingsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SettingsModule-67397348b7c6d4a07cb0be1eb883078de11c70a329cd6d2ed095e5bca3fedfd0f208914add604b1be72dbe4fa8521e621d7c9f122b1c23a1d8caf26da46bf4c5"' : 'data-target="#xs-controllers-links-module-SettingsModule-67397348b7c6d4a07cb0be1eb883078de11c70a329cd6d2ed095e5bca3fedfd0f208914add604b1be72dbe4fa8521e621d7c9f122b1c23a1d8caf26da46bf4c5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SettingsModule-67397348b7c6d4a07cb0be1eb883078de11c70a329cd6d2ed095e5bca3fedfd0f208914add604b1be72dbe4fa8521e621d7c9f122b1c23a1d8caf26da46bf4c5"' :
                                            'id="xs-controllers-links-module-SettingsModule-67397348b7c6d4a07cb0be1eb883078de11c70a329cd6d2ed095e5bca3fedfd0f208914add604b1be72dbe4fa8521e621d7c9f122b1c23a1d8caf26da46bf4c5"' }>
                                            <li class="link">
                                                <a href="controllers/SettingsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SettingsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SettingsModule-67397348b7c6d4a07cb0be1eb883078de11c70a329cd6d2ed095e5bca3fedfd0f208914add604b1be72dbe4fa8521e621d7c9f122b1c23a1d8caf26da46bf4c5"' : 'data-target="#xs-injectables-links-module-SettingsModule-67397348b7c6d4a07cb0be1eb883078de11c70a329cd6d2ed095e5bca3fedfd0f208914add604b1be72dbe4fa8521e621d7c9f122b1c23a1d8caf26da46bf4c5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SettingsModule-67397348b7c6d4a07cb0be1eb883078de11c70a329cd6d2ed095e5bca3fedfd0f208914add604b1be72dbe4fa8521e621d7c9f122b1c23a1d8caf26da46bf4c5"' :
                                        'id="xs-injectables-links-module-SettingsModule-67397348b7c6d4a07cb0be1eb883078de11c70a329cd6d2ed095e5bca3fedfd0f208914add604b1be72dbe4fa8521e621d7c9f122b1c23a1d8caf26da46bf4c5"' }>
                                        <li class="link">
                                            <a href="injectables/SettingsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SettingsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-3772c5195e2c29e2664e9bcb5462c6239f1b1262033623ab9a102902ea7cba99dac51f8095ece6f15158913240dc6aafda47dceee52242875667f006734e2afc"' : 'data-target="#xs-controllers-links-module-UsersModule-3772c5195e2c29e2664e9bcb5462c6239f1b1262033623ab9a102902ea7cba99dac51f8095ece6f15158913240dc6aafda47dceee52242875667f006734e2afc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-3772c5195e2c29e2664e9bcb5462c6239f1b1262033623ab9a102902ea7cba99dac51f8095ece6f15158913240dc6aafda47dceee52242875667f006734e2afc"' :
                                            'id="xs-controllers-links-module-UsersModule-3772c5195e2c29e2664e9bcb5462c6239f1b1262033623ab9a102902ea7cba99dac51f8095ece6f15158913240dc6aafda47dceee52242875667f006734e2afc"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-3772c5195e2c29e2664e9bcb5462c6239f1b1262033623ab9a102902ea7cba99dac51f8095ece6f15158913240dc6aafda47dceee52242875667f006734e2afc"' : 'data-target="#xs-injectables-links-module-UsersModule-3772c5195e2c29e2664e9bcb5462c6239f1b1262033623ab9a102902ea7cba99dac51f8095ece6f15158913240dc6aafda47dceee52242875667f006734e2afc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-3772c5195e2c29e2664e9bcb5462c6239f1b1262033623ab9a102902ea7cba99dac51f8095ece6f15158913240dc6aafda47dceee52242875667f006734e2afc"' :
                                        'id="xs-injectables-links-module-UsersModule-3772c5195e2c29e2664e9bcb5462c6239f1b1262033623ab9a102902ea7cba99dac51f8095ece6f15158913240dc6aafda47dceee52242875667f006734e2afc"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Booking.html" data-type="entity-link" >Booking</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Flight.html" data-type="entity-link" >Flight</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Passenger.html" data-type="entity-link" >Passenger</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Seat.html" data-type="entity-link" >Seat</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Booking.html" data-type="entity-link" >Booking</a>
                            </li>
                            <li class="link">
                                <a href="classes/BookingBisDto.html" data-type="entity-link" >BookingBisDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/BookingDto.html" data-type="entity-link" >BookingDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBookingDto.html" data-type="entity-link" >CreateBookingDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFlightDto.html" data-type="entity-link" >CreateFlightDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePassengerDto.html" data-type="entity-link" >CreatePassengerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSeatDto.html" data-type="entity-link" >CreateSeatDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmailVerificationDto.html" data-type="entity-link" >EmailVerificationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetBookingsDto.html" data-type="entity-link" >GetBookingsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetFlightsDto.html" data-type="entity-link" >GetFlightsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Passenger.html" data-type="entity-link" >Passenger</a>
                            </li>
                            <li class="link">
                                <a href="classes/PassengerDto.html" data-type="entity-link" >PassengerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PasswordResetDto.html" data-type="entity-link" >PasswordResetDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RemoveImageDto.html" data-type="entity-link" >RemoveImageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Seat.html" data-type="entity-link" >Seat</a>
                            </li>
                            <li class="link">
                                <a href="classes/SeatDto.html" data-type="entity-link" >SeatDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SerializeInterceptor.html" data-type="entity-link" >SerializeInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBookingDto.html" data-type="entity-link" >UpdateBookingDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBookingStatusDto.html" data-type="entity-link" >UpdateBookingStatusDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFlightDto.html" data-type="entity-link" >UpdateFlightDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePassengerDto.html" data-type="entity-link" >UpdatePassengerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSeatDto.html" data-type="entity-link" >UpdateSeatDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSettingsDto.html" data-type="entity-link" >UpdateSettingsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UploadImageDto.html" data-type="entity-link" >UploadImageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserCredentialsDto.html" data-type="entity-link" >UserCredentialsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDto.html" data-type="entity-link" >UserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/VerifyEmailDto.html" data-type="entity-link" >VerifyEmailDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CurrentUserMiddleware.html" data-type="entity-link" >CurrentUserMiddleware</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminGuard.html" data-type="entity-link" >AdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/BookingEvent.html" data-type="entity-link" >BookingEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ClassConstructor.html" data-type="entity-link" >ClassConstructor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Request.html" data-type="entity-link" >Request</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});