import React, { useState } from 'react';
import NavBar from "../../components/Navbar/NavBar";
import NavBarLog from "../../components/Navbar/NavBarLog";
import './Rules.css'

const Rules = () => {

    const accessToken = localStorage.getItem("accessToken");

    const [accepted, setAccepted] = useState(false);

    const handleAccept = () => {
        setAccepted(true);
    };

    const handleLink = () => {
        localStorage.removeItem("accessToken");
        // window.location.href = "https://discord.com/api/oauth2/authorize?client_id=777992628045611072&redirect_uri=http%3A%2F%2Flocalhost%3A3600%2Fredirection&response_type=code&scope=identify%20guilds%20email%20guilds.members.read%20guilds.join";
        window.location.href = "https://discord.com/api/oauth2/authorize?client_id=777992628045611072&redirect_uri=https%3A%2F%2Fpanel.karusa.fr%2Fredirection&response_type=code&scope=identify%20guilds%20guilds.join%20email%20guilds.members.read";
    };


    return (
        <div>
            {accessToken ? <NavBarLog /> : <NavBar />}
            <br />
            <br />
            <br className='phone'/>
            <br className='phone'/>
            <br className='phone'/>
            <br className='phone'/>

            <div className="rules">
            <h1 class="living-main">Règlement du serveur.</h1>
            <div/>
                <h2 class="living-main-h2">Voici le règlement du serveur. Avant de rejoindre merci de le lire attentivement !</h2>
                <br />
                <div className="RuleText">
                <h3 class="living-main-h3">Règlement communication textuelle</h3>
                <h4 class="living-main-h4">1 Respect des membres :</h4>
                <p>
                    Soyez respectueux envers tous les membres du serveur, quelle que soit leur origine, leur identité de genre, leur orientation sexuelle, leur religion ou leurs opinions.<br />
                    Évitez les propos offensants, la discrimination, le harcèlement, le trolling ou toute autre forme de comportement nuisible.<br />
                    Ne publiez pas de contenu haineux, violent, pornographique ou illégal.<br />
                    Respectez les droits d'auteur et ne partagez pas de contenu sans autorisation appropriée.
                </p>
                <h4 class="living-main-h4">2 Langage et ton :</h4>
                <p>
                    Utilisez un langage approprié et évitez les grossièretés excessives. <br />
                    Évitez d'utiliser des majuscules excessives (crier) ou des caractères spéciaux pour perturber la lisibilité des messages. <br />
                    Ne spammez pas le serveur avec des messages répétitifs ou inutiles. <br />
                </p>
                <h4 class="living-main-h4">3 Publicité et autopromotion :</h4>
                <p>
                    La publicité non sollicitée est interdite. N'envoyez pas de liens, de publicités ou de messages privés non sollicités. <br />
                    L'autopromotion est autorisée dans les canaux spécifiquement dédiés à cet effet, mais évitez le spam excessif. <br />
                    Veuillez demander la permission à l'administrateur avant de promouvoir ou de partager du contenu externe. <br />
                </p>
                <h4 class="living-main-h4">4 Contenu et canaux :</h4>
                <p>
                    Postez le contenu dans les canaux appropriés. Évitez de dévier du sujet principal du canal. <br />
                    Utilisez les salons vocaux pour les discussions vocales. Évitez d'utiliser les canaux textuels pour des conversations vocales prolongées. <br />
                    Respectez les thèmes et les règles spécifiques des canaux s'ils sont précisés. <br />
                </p>
                <h4 class="living-main-h4">5 Confidentialité et sécurité :</h4>
                <p>
                    Ne partagez pas d'informations personnelles sensibles, telles que des adresses, des numéros de téléphone ou des informations bancaires. <br />
                    Respectez la vie privée des autres membres et ne partagez pas leurs informations sans leur consentement. <br />
                    Signalez immédiatement tout comportement suspect ou toute violation de la sécurité à l'administrateur. <br />
                </p>
                <h4 class="living-main-h4">6 Rôles et autorités :</h4>
                <p>
                    Respectez les décisions prises par les modérateurs et les administrateurs du serveur. <br />
                    Évitez de vous faire passer pour un membre du personnel du serveur si vous ne l'êtes pas. <br />
                    Les sanctions peuvent être appliquées en cas de non-respect des règles. Lisez les règles spécifiques concernant les avertissements, les suspensions ou les expulsions. <br />
                </p>
                <h4 class="living-main-h4">7 Suggestions et commentaires :</h4>
                <p>
                    Vos suggestions et commentaires sont les bienvenus ! Partagez-les dans les canaux dédiés. <br />
                    Soyez constructif et respectueux lorsque vous exprimez vos opinions sur les améliorations du serveur. <br />
                </p>
                </div>
                <div className="RulesVoc">
                <h3 class="living-main-h3">Règlement communication vocale</h3>
                <h4 class="living-main-h4">1 Respect des membres :</h4>
                <p>
                    Soyez respectueux envers tous les membres du serveur, quel que soit leur origine, leur identité de genre, leur orientation sexuelle, leur religion ou leurs opinions. <br />
                    Évitez les propos offensants, la discrimination, le harcèlement, les insultes ou tout autre comportement nuisible. <br />
                    Respectez les décisions prises par les modérateurs et les administrateurs du serveur. <br />
                </p>
                <h4 class="living-main-h4">2 Utilisation appropriée du micro :</h4>
                <p>
                    Évitez d'utiliser le micro de manière excessive, telle que des cris ou des bruits forts et dérangeants. <br />
                    Ne diffusez pas de musique, de sons ou de bruits de fond perturbateurs sans l'autorisation des autres membres. <br />
                    Utilisez la fonction "Push to Talk" pour éviter les bruits de fond indésirables lorsque vous ne parlez pas. <br />
                </p>
                <h4 class="living-main-h4">3 Langage et ton :</h4>
                <p>
                    Utilisez un langage approprié et évitez les grossièretés excessives. <br />
                    Respectez les autres membres en évitant les insultes, les propos dégradants ou les discours de haine. <br />
                    Évitez de parler en permanence ou de monopoliser la conversation. <br />
                </p>
                <h4 class="living-main-h4">4 Contenu et sujets :</h4>
                <p>
                    Évitez de partager du contenu offensant, haineux, violent, pornographique ou illégal. <br />
                    Respectez les thèmes spécifiques des canaux vocaux et évitez de dévier du sujet principal. <br />
                    Les discussions politiques ou religieuses sensibles doivent être menées avec respect et ouverture d'esprit. <br />
                </p>
                <h4 class="living-main-h4">5 Confidentialité et sécurité :</h4>
                <p>
                    Ne partagez pas d'informations personnelles sensibles, telles que des adresses, des numéros de téléphone ou des informations bancaires. <br />
                    Respectez la vie privée des autres membres et ne partagez pas leurs informations sans leur consentement. <br />
                    Signalez immédiatement tout comportement suspect ou toute violation de la sécurité à l'administrateur. <br />
                </p>
                <h4 class="living-main-h4">6 Rôles et autorités :</h4>
                <p>
                    Respectez les décisions prises par les modérateurs et les administrateurs du serveur.
                    Évitez de vous faire passer pour un membre du personnel du serveur si vous ne l'êtes pas.
                    Les sanctions peuvent être appliquées en cas de non-respect des règles. Lisez les règles spécifiques concernant les avertissements, les suspensions ou les expulsions.
                </p>
                <h4 class="living-main-h4">7 Suggestions et commentaires :</h4>
                <p>
                    Vos suggestions et commentaires sont les bienvenus ! Partagez-les dans les canaux dédiés. <br />
                    Soyez constructif et respectueux lorsque vous exprimez vos opinions sur les améliorations du serveur. <br />
                </p>
                </div>
                <div className="RulesC">
                <h3 class="living-main-h3">Règlement propriété intellectuelle</h3>
                <h4 class="living-main-h4">1 Propriété intellectuelle du serveur :</h4>
                <p>
                    Tout contenu original créé spécifiquement pour le serveur Discord, y compris les logos, les graphiques, les bots personnalisés, les fonctionnalités et les systèmes, reste la propriété intellectuelle du serveur. <br />
                    Les membres ne sont pas autorisés à reproduire, modifier ou distribuer ce contenu sans l'autorisation expresse de l'administrateur du serveur. <br />
                </p>
                <h4 class="living-main-h4">2 Contributions des membres :</h4>
                <p>
                    Les membres peuvent proposer des idées, des suggestions ou des contributions pour les nouveautés ou les systèmes du serveur. <br />
                    En proposant des idées ou des contributions, les membres reconnaissent que ces propositions peuvent être utilisées, modifiées ou développées par l'administrateur du serveur sans qu'une rémunération ou une attribution spécifique ne soit due. <br />
                </p>
                <h4 class="living-main-h4">3 Respect des droits d'auteur :</h4>
                <p>
                    Les membres sont tenus de respecter les droits d'auteur et les licences applicables lorsqu'ils contribuent à des nouveautés ou des systèmes du serveur. <br />
                    Ne proposez pas ou ne partagez pas de contenu protégé par des droits d'auteur sans l'autorisation appropriée ou sans respecter les termes de la licence. <br />
                </p>
                <h3 class="living-main-h3">4 Responsabilité des membres :</h3>
                <p>
                    Les membres sont responsables du contenu qu'ils proposent, partagent ou contribuent aux nouveautés ou aux systèmes du serveur. <br />
                    Les membres doivent s'assurer qu'ils ont les droits nécessaires pour partager le contenu et doivent respecter les demandes de retrait émises par les titulaires des droits légitimes. <br />
                </p>
                <h3 class="living-main-h3">5 Conséquences des violations :</h3>
                <p>
                    Les violations répétées ou graves des droits de propriété intellectuelle peuvent entraîner des avertissements, des suspensions ou des expulsions du serveur. <br />
                    L'administrateur se réserve le droit de supprimer tout contenu en violation des droits d'auteur ou de propriété intellectuelle sans préavis. <br />
                </p>
                </div>
            </div>
            <br />
            <br />
            <br className='phone'/>
            <br className='phone'/>
            <div className='centered-container'>
                <button className='LuApprouve' onClick={handleAccept}>J'ai lu et accepté le règlement</button>
                
                {accepted && (

                    <button onClick={handleLink}>Rejoindre le serveur</button>
                )}
            </div>
            <br />
            <br />
        </div>
    )
}

export default Rules;