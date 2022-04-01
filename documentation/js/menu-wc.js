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
                                            'data-target="#controllers-links-module-AppModule-79f3afe29b912c22ccd02c4d3aa992a8f778d5dc07012ca7893b27ef5833a3d3aef3e6bd257dc7e59839543a434e6a02df5705810024a8a6abcf3d6784282d52"' : 'data-target="#xs-controllers-links-module-AppModule-79f3afe29b912c22ccd02c4d3aa992a8f778d5dc07012ca7893b27ef5833a3d3aef3e6bd257dc7e59839543a434e6a02df5705810024a8a6abcf3d6784282d52"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-79f3afe29b912c22ccd02c4d3aa992a8f778d5dc07012ca7893b27ef5833a3d3aef3e6bd257dc7e59839543a434e6a02df5705810024a8a6abcf3d6784282d52"' :
                                            'id="xs-controllers-links-module-AppModule-79f3afe29b912c22ccd02c4d3aa992a8f778d5dc07012ca7893b27ef5833a3d3aef3e6bd257dc7e59839543a434e6a02df5705810024a8a6abcf3d6784282d52"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-79f3afe29b912c22ccd02c4d3aa992a8f778d5dc07012ca7893b27ef5833a3d3aef3e6bd257dc7e59839543a434e6a02df5705810024a8a6abcf3d6784282d52"' : 'data-target="#xs-injectables-links-module-AppModule-79f3afe29b912c22ccd02c4d3aa992a8f778d5dc07012ca7893b27ef5833a3d3aef3e6bd257dc7e59839543a434e6a02df5705810024a8a6abcf3d6784282d52"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-79f3afe29b912c22ccd02c4d3aa992a8f778d5dc07012ca7893b27ef5833a3d3aef3e6bd257dc7e59839543a434e6a02df5705810024a8a6abcf3d6784282d52"' :
                                        'id="xs-injectables-links-module-AppModule-79f3afe29b912c22ccd02c4d3aa992a8f778d5dc07012ca7893b27ef5833a3d3aef3e6bd257dc7e59839543a434e6a02df5705810024a8a6abcf3d6784282d52"' }>
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
                                            'data-target="#controllers-links-module-FlightsModule-450cac249fae06795d6e988f12b6ce71f44098fc315dea074728b4cfca40403866877b3c4b8caf2b6b7525ca8570c7bb8a495194762fbb44cb0e7a24e12994cf"' : 'data-target="#xs-controllers-links-module-FlightsModule-450cac249fae06795d6e988f12b6ce71f44098fc315dea074728b4cfca40403866877b3c4b8caf2b6b7525ca8570c7bb8a495194762fbb44cb0e7a24e12994cf"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FlightsModule-450cac249fae06795d6e988f12b6ce71f44098fc315dea074728b4cfca40403866877b3c4b8caf2b6b7525ca8570c7bb8a495194762fbb44cb0e7a24e12994cf"' :
                                            'id="xs-controllers-links-module-FlightsModule-450cac249fae06795d6e988f12b6ce71f44098fc315dea074728b4cfca40403866877b3c4b8caf2b6b7525ca8570c7bb8a495194762fbb44cb0e7a24e12994cf"' }>
                                            <li class="link">
                                                <a href="controllers/FlightsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FlightsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FlightsModule-450cac249fae06795d6e988f12b6ce71f44098fc315dea074728b4cfca40403866877b3c4b8caf2b6b7525ca8570c7bb8a495194762fbb44cb0e7a24e12994cf"' : 'data-target="#xs-injectables-links-module-FlightsModule-450cac249fae06795d6e988f12b6ce71f44098fc315dea074728b4cfca40403866877b3c4b8caf2b6b7525ca8570c7bb8a495194762fbb44cb0e7a24e12994cf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FlightsModule-450cac249fae06795d6e988f12b6ce71f44098fc315dea074728b4cfca40403866877b3c4b8caf2b6b7525ca8570c7bb8a495194762fbb44cb0e7a24e12994cf"' :
                                        'id="xs-injectables-links-module-FlightsModule-450cac249fae06795d6e988f12b6ce71f44098fc315dea074728b4cfca40403866877b3c4b8caf2b6b7525ca8570c7bb8a495194762fbb44cb0e7a24e12994cf"' }>
                                        <li class="link">
                                            <a href="injectables/FlightsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FlightsService</a>
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
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmailVerificationDto.html" data-type="entity-link" >EmailVerificationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PasswordResetDto.html" data-type="entity-link" >PasswordResetDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SerializeInterceptor.html" data-type="entity-link" >SerializeInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFlightDto.html" data-type="entity-link" >UpdateFlightDto</a>
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