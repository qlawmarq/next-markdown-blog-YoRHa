import Link from '@/components/Link'

export default function Pagination({ totalPages, currentPage }) {
  const prevPage = parseInt(currentPage) - 1 > 0
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages)

  return (
    <div>
      <nav>
        {!prevPage && <button disabled={!prevPage}>Previous</button>}
        {prevPage && (
          <Link href={currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`}>
            <button>Previous</button>
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && <button disabled={!nextPage}>Next</button>}
        {nextPage && (
          <Link href={`/blog/page/${currentPage + 1}`}>
            <button>Next</button>
          </Link>
        )}
      </nav>
    </div>
  )
}
