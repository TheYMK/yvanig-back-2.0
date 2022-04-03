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
                                            'data-target="#controllers-links-module-AppModule-ae7bbac71ef3061cb5ac4a943119c617ed54e6e38ad9aa58ea15953466bf4c482fb68e1289109e0ca936110622afea582f5330656844902047647173bc40ad35"' : 'data-target="#xs-controllers-links-module-AppModule-ae7bbac71ef3061cb5ac4a943119c617ed54e6e38ad9aa58ea15953466bf4c482fb68e1289109e0ca936110622afea582f5330656844902047647173bc40ad35"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-ae7bbac71ef3061cb5ac4a943119c617ed54e6e38ad9aa58ea15953466bf4c482fb68e1289109e0ca936110622afea582f5330656844902047647173bc40ad35"' :
                                            'id="xs-controllers-links-module-AppModule-ae7bbac71ef3061cb5ac4a943119c617ed54e6e38ad9aa58ea15953466bf4c482fb68e1289109e0ca936110622afea582f5330656844902047647173bc40ad35"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-ae7bbac71ef3061cb5ac4a943119c617ed54e6e38ad9aa58ea15953466bf4c482fb68e1289109e0ca936110622afea582f5330656844902047647173bc40ad35"' : 'data-target="#xs-injectables-links-module-AppModule-ae7bbac71ef3061cb5ac4a943119c617ed54e6e38ad9aa58ea15953466bf4c482fb68e1289109e0ca936110622afea582f5330656844902047647173bc40ad35"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-ae7bbac71ef3061cb5ac4a943119c617ed54e6e38ad9aa58ea15953466bf4c482fb68e1289109e0ca936110622afea582f5330656844902047647173bc40ad35"' :
                                        'id="xs-injectables-links-module-AppModule-ae7bbac71ef3061cb5ac4a943119c617ed54e6e38ad9aa58ea15953466bf4c482fb68e1289109e0ca936110622afea582f5330656844902047647173bc40ad35"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
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
                                <a href="modules/SeatsModule.html" data-type="entity-link" >SeatsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SeatsModule-7f48b73ebda741f6a74c7777fb03e495fae00aefc39e6a8749ce64ef2fcc812dfb60b110b292025f749ac2b801d4f1085872fd689b55baadb59d36775b5af857"' : 'data-target="#xs-controllers-links-module-SeatsModule-7f48b73ebda741f6a74c7777fb03e495fae00aefc39e6a8749ce64ef2fcc812dfb60b110b292025f749ac2b801d4f1085872fd689b55baadb59d36775b5af857"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SeatsModule-7f48b73ebda741f6a74c7777fb03e495fae00aefc39e6a8749ce64ef2fcc812dfb60b110b292025f749ac2b801d4f1085872fd689b55baadb59d36775b5af857"' :
                                            'id="xs-controllers-links-module-SeatsModule-7f48b73ebda741f6a74c7777fb03e495fae00aefc39e6a8749ce64ef2fcc812dfb60b110b292025f749ac2b801d4f1085872fd689b55baadb59d36775b5af857"' }>
                                            <li class="link">
                                                <a href="controllers/SeatsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SeatsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SeatsModule-7f48b73ebda741f6a74c7777fb03e495fae00aefc39e6a8749ce64ef2fcc812dfb60b110b292025f749ac2b801d4f1085872fd689b55baadb59d36775b5af857"' : 'data-target="#xs-injectables-links-module-SeatsModule-7f48b73ebda741f6a74c7777fb03e495fae00aefc39e6a8749ce64ef2fcc812dfb60b110b292025f749ac2b801d4f1085872fd689b55baadb59d36775b5af857"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SeatsModule-7f48b73ebda741f6a74c7777fb03e495fae00aefc39e6a8749ce64ef2fcc812dfb60b110b292025f749ac2b801d4f1085872fd689b55baadb59d36775b5af857"' :
                                        'id="xs-injectables-links-module-SeatsModule-7f48b73ebda741f6a74c7777fb03e495fae00aefc39e6a8749ce64ef2fcc812dfb60b110b292025f749ac2b801d4f1085872fd689b55baadb59d36775b5af857"' }>
                                        <li class="link">
                                            <a href="injectables/SeatsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SeatsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-66f012ee761da6d2150a062b97981ca2f0b2278df7d39132fa2e6b5b703f4b5f68b14ccf68e44b0308b7dff144080041fa2a9510d0cfc509b3e641f6336babc6"' : 'data-target="#xs-controllers-links-module-UsersModule-66f012ee761da6d2150a062b97981ca2f0b2278df7d39132fa2e6b5b703f4b5f68b14ccf68e44b0308b7dff144080041fa2a9510d0cfc509b3e641f6336babc6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-66f012ee761da6d2150a062b97981ca2f0b2278df7d39132fa2e6b5b703f4b5f68b14ccf68e44b0308b7dff144080041fa2a9510d0cfc509b3e641f6336babc6"' :
                                            'id="xs-controllers-links-module-UsersModule-66f012ee761da6d2150a062b97981ca2f0b2278df7d39132fa2e6b5b703f4b5f68b14ccf68e44b0308b7dff144080041fa2a9510d0cfc509b3e641f6336babc6"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-66f012ee761da6d2150a062b97981ca2f0b2278df7d39132fa2e6b5b703f4b5f68b14ccf68e44b0308b7dff144080041fa2a9510d0cfc509b3e641f6336babc6"' : 'data-target="#xs-injectables-links-module-UsersModule-66f012ee761da6d2150a062b97981ca2f0b2278df7d39132fa2e6b5b703f4b5f68b14ccf68e44b0308b7dff144080041fa2a9510d0cfc509b3e641f6336babc6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-66f012ee761da6d2150a062b97981ca2f0b2278df7d39132fa2e6b5b703f4b5f68b14ccf68e44b0308b7dff144080041fa2a9510d0cfc509b3e641f6336babc6"' :
                                        'id="xs-injectables-links-module-UsersModule-66f012ee761da6d2150a062b97981ca2f0b2278df7d39132fa2e6b5b703f4b5f68b14ccf68e44b0308b7dff144080041fa2a9510d0cfc509b3e641f6336babc6"' }>
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
                                    <a href="entities/Flight.html" data-type="entity-link" >Flight</a>
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
                                <a href="classes/CreateFlightDto.html" data-type="entity-link" >CreateFlightDto</a>
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
                                <a href="classes/GetFlightsDto.html" data-type="entity-link" >GetFlightsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PasswordResetDto.html" data-type="entity-link" >PasswordResetDto</a>
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
                                <a href="classes/UpdateFlightDto.html" data-type="entity-link" >UpdateFlightDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSeatDto.html" data-type="entity-link" >UpdateSeatDto</a>
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