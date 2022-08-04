	<footer aria-label="Collegamenti utili">
		<div>
			<h2>L'inquilino</h2>
			<p>Sono un <a href="/ciao-america" title="il racconto del giorno del grande viaggio">cervello in fuga</a>: dal 2008 risiedo in un ridente paesino del New Jersey, negli Stati Uniti.
			Quest'angolino sperduto della rete, dove condivido quello che mi passa per la testa, &egrave; da sempre il mio laboratorio creativo aperto al confronto di opinioni.</p>
		</div>

		<nav>
			<h2>Calce e mattoni</h2>
			<ul>
				<li><a href="https://www.tophost.it" title="il fornitore di hosting italiano che ospita dal 2005 queste pagine">Il servizio che mi ospita</a></li>
				<li><a href="https://it.wordpress.org/" title="sito italiano del sistema WordPress per la gestione dei contenuti">Il sistema di gestione</a></li>
				<li><a href="/accessibile" title="leggi le informazioni sul livello di accessibilit&agrave; di queste pagine">Un sito accessibile a tutti</a></li>
				<li><a href="https://validator.w3.org/nu/?doc=https%3A%2F%2Fwww.duechiacchiere.it%2F" rel="nofollow" hreflang="en" title="pagina in inglese per verificare la correttezza semantica di un sito">Un codice impeccabile</a></li>
				<li><a href="http://www.rxstrip.it/">L'artista del ragazzo</a></li>
				<li><a href="https://creativecommons.org/licenses/by-sa/4.0/deed.it" rel="nofollow" title="pagina in italiano che descrive la licenza per i contenuti">La licenza di attribuzione</a></li>
			</ul>
		</nav>

		<nav>
			<h2>Varie ed eventuali</h2>
			<ul>
				<li><a href="https://www.linkedin.com/in/gerlando/" hreflang="en">Il mio profilo su LinkedIn</a></li>
				<li><a href="https://github.com/gerlandotermini" hreflang="en">Il codice che scrivo</a></li>
				<li><a href="/contatto" title="lasciami un messaggio tramite il modulo di contatto">La buca delle lettere</a></li>
				<li><a href="/feed">Il <span lang="en">feed</span> <abbr title="really simple syndication" lang="en">RSS</abbr> degli articoli</a></li>
				<li><a href="/privacy">La tua <span lang="en">privacy</span> al sicuro</a></li>
				<li><a href="/moderazione" title="domande e risposte sulle mie regole di moderazione dei commenti">Le regole per i commenti</a></li>
			</ul>
		</nav>

		<nav>
			<h2>Indietro nel tempo</h2>
			<ul>
				<?php 
					$month_links = explode( '</li>', str_replace( array( '<li>', "\n" ), '', wp_get_archives( 'type=monthly&limit=120&echo=0' ) ) ); 
					$count_links = 0;

					foreach ( $month_links as $a_month_link ) {
						if ( $count_links > 4 ) {
							break;
						}
						if ( strpos( $a_month_link, date_i18n( 'F Y' ) ) !== false ) {
							continue;
						}
						
						echo '<li>' . trim( $a_month_link ) . "</li>";
						$count_links++;
					}
				?>
				<li><a href="/?day=<?= date_i18n( 'd' ) ?>&monthnum=<?= date_i18n( 'm' ) ?>" rel="nofollow">Oggi nel passato</a>
			</ul>
		</nav>
	</footer>

	<button id="backtotop" onclick="window.scrollTo(0, 0);">
		<span class="visually-hidden">Usa questo pulsante per tornare in cima alla pagina</span>
	</button>

	<!-- BEGIN: WP_Footer -->
	<?php ob_start();
		wp_footer();
		$footer = ob_get_contents();
		ob_end_clean();
		$footer = str_replace( " type='text/javascript'", '', $footer );
		echo str_replace( ' type="text/javascript"', '', $footer ); 
	?>

	<!-- END: WP_Footer -->
</body>
</html>